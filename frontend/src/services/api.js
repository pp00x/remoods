import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/mood';

export const fetchMood = async (subreddit) => {
  try {
    const response = await axios.get(`${API_URL}/${subreddit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};