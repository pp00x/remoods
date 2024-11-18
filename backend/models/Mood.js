// models/Mood.js
const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  subreddit: { type: String, required: true },
  date: { type: String, required: true },
  mood: { type: String, required: true },
  explanation: { type: String, required: true },
});

MoodSchema.index({ subreddit: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Mood', MoodSchema);