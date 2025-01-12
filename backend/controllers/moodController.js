// controllers/moodController.js
const fs = require('fs');
const snoowrap = require('snoowrap');
const Mood = require('../models/Mood');
const redisClient = require('../config/redisClient');

// Import the Gemini AI client library
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// Reddit API Setup
const reddit = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
});

// Helper function to analyze mood
async function analyzeMood(text) {
  try {
    // Get the Gemini text model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-1219' });

    // Prepare the prompt
    const prompt = `Analyze the overall mood of the following subreddit and provide the mood and an explanation. You must output in the following format:

Mood: {mood}
Explanation: {explanation}

Please ensure your response exactly matches this format to enable regex pattern matching with:
- /Mood:\\s*(.*)/i
- /Explanation:\\s*([\\s\\S]*)/i`;

    const fullPrompt = `${prompt}\n\n${text}`;

    // Call the generateContent method with the prompt
    const result = await model.generateContent([fullPrompt]);

    // Extract the response text
    const responseText = await result.response.text();

    // Parse the responseText to extract mood and explanation
    let mood = '';
    let explanation = '';

    // Simple parsing (adjust as necessary)
    const moodMatch = responseText.match(/Mood:\s*(.*)/i);
    const explanationMatch = responseText.match(/Explanation:\s*([\s\S]*)/i);

    if (moodMatch) {
      mood = moodMatch[1].trim();
    } else {
      mood = 'Unknown';
    }

    if (explanationMatch) {
      explanation = explanationMatch[1].trim();
    } else {
      explanation = responseText.trim();
    }

    return {
      mood,
      explanation,
    };
  } catch (error) {
    console.error('Error analyzing mood:', error.response?.data || error.message);
    throw new Error('Mood analysis failed.');
  }
}

// Controller Function
exports.getMood = async (req, res, next) => {
  try {
    const subredditInput = req.params.subreddit.toLowerCase();
    const subreddit = subredditInput.replace(/^r\//, '');
    const date = new Date().toISOString().split('T')[0];
    const cacheKey = `mood:${subreddit}:${date}`;

    // Validate Subreddit
    try {
      await reddit.getSubreddit(subreddit).fetch();
    } catch (err) {
      return res.status(404).json({ error: 'Subreddit not found or is private.' });
    }

    // Check Redis Cache
    const cachedMood = await redisClient.get(cacheKey);
    if (cachedMood) {
      console.log('Fetching from Redis cache');
      return res.json(JSON.parse(cachedMood));
    }

    // Check Database
    let moodData = await Mood.findOne({ subreddit, date });
    if (moodData) {
      console.log('Fetching from MongoDB');
      await redisClient.set(cacheKey, JSON.stringify(moodData));
      return res.json(moodData);
    }

    // Fetch Posts from Reddit
    const posts = await reddit.getSubreddit(subreddit).getTop({ time: 'day', limit: 20 });

    // Handle No Posts Scenario
    if (!posts.length) {
      return res.status(404).json({ error: 'No posts found for this subreddit today.' });
    }

    let combinedText = '';

    // Iterate over posts
    for (const post of posts) {
      // Handle Post Content
      let postContent = '';

      // Check if the post is an image
      if (post.is_reddit_media_domain && post.post_hint === 'image') {
        postContent += `[Image Post: ${post.title}]`;
      } else {
        postContent += `${post.title} ${post.selftext}`;
      }

      // Fetch top 20 comments sorted by best
      const comments = await post.expandReplies({ limit: 20, depth: 1 });

      // Collect comment texts
      const commentTexts = [];
      for (const comment of comments.comments) {
        if (comment.body) {
          // Check if the comment contains an image
          if (comment.body.includes('![img](') || comment.body.includes('[Image]')) {
            commentTexts.push('[Image in Comment]');
          } else {
            commentTexts.push(comment.body);
          }
        }
      }

      // Combine post content and comments
      combinedText += `${postContent} ${commentTexts.join(' ')} `;
    }

    // Analyze Mood
    const moodResponse = await analyzeMood(combinedText);
    moodData = {
      subreddit,
      date,
      mood: moodResponse.mood,
      explanation: moodResponse.explanation,
    };


    // Save to Database
    await new Mood(moodData).save();

    // Cache in Redis with Expiration at End of Day
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const ttl = Math.floor((endOfDay - now) / 1000); // Time to midnight in seconds
    await redisClient.set(cacheKey, JSON.stringify(moodData), 'EX', ttl);

    res.json(moodData);
  } catch (error) {
    next(error);
  }
};
