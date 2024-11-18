// routes/moodRoutes.js
const express = require('express');
const router = express.Router();
const { getMood } = require('../controllers/moodController');

router.get('/:subreddit', getMood);

module.exports = router;