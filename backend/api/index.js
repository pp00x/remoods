// remoods/backend/api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const moodRoutes = require('../routes/moodRoutes'); // Adjusted path
const connectDB = require('../config/db'); // Adjusted path

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// It's important to ensure connectDB() can be called multiple times
// or handles connections appropriately in a serverless environment.
// For Vercel, functions can be cold-started, so connection management is key.
connectDB();

// Routes
// The vercel.json will rewrite "/(.*)" to "/api".
// A request to your Vercel URL like /api/mood/:subreddit will be routed here.
// The path seen by this Express app will be /mood/:subreddit.
app.use('/mood', moodRoutes);

// Add a root route handler
app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send("<h1>Remoods API is running</h1><p>Try accessing /mood/:subreddit</p>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;