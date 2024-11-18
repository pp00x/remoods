// backend/redditClient.js
const axios = require('axios');
require('dotenv').config();

let accessToken = '';

async function getAccessToken() {
  const response = await axios.post('https://www.reddit.com/api/v1/access_token', 'grant_type=password&username=' + process.env.REDDIT_USERNAME + '&password=' + process.env.REDDIT_PASSWORD, {
    auth: {
      username: process.env.REDDIT_CLIENT_ID,
      password: process.env.REDDIT_CLIENT_SECRET,
    },
    headers: {
      'User-Agent': process.env.REDDIT_USER_AGENT,
    },
  });
  accessToken = response.data.access_token;
}

async function fetchSubredditPosts(subreddit) {
  if (!accessToken) {
    await getAccessToken();
  }
  const response = await axios.get(`https://oauth.reddit.com/r/${subreddit}/new`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': process.env.REDDIT_USER_AGENT,
    },
    params: {
      limit: 100,
    },
  });
  return response.data.data.children;
}

module.exports = { fetchSubredditPosts };