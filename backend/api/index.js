// remoods/backend/api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const moodRoutes = require('../routes/moodRoutes'); // Adjusted path
const connectDB = require('../config/db'); // Adjusted path

const app = express();

// Middleware
const frontendURL = process.env.FRONTEND_URL;
const corsOptions = {
  origin: frontendURL || '*', // Fallback to all origins if FRONTEND_URL is not set
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

if (frontendURL) {
  console.log(`CORS configured to allow origin: ${frontendURL}`);
} else {
  console.warn('FRONTEND_URL environment variable not set. CORS will allow all origins (*). This is not recommended for production.');
}

app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
// It's important to ensure connectDB() can be called multiple times
// or handles connections appropriately in a serverless environment.
// For Vercel, functions can be cold-started, so connection management is key.
connectDB();

// Routes
// The vercel.json will rewrite "/(.*)" to "/api".
// A request to your Vercel URL like /api/mood/:subreddit will be routed here.
// The path seen by this Express app will be the original path, e.g., /api/mood/:subreddit.
app.use('/api/mood', moodRoutes);

// Add a root route handler for the API base path after Vercel rewrite
// e.g., https://remoods-api.vercel.app/ (which Vercel rewrites to /api)
app.get("/api", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send("<h1>Remoods API is running</h1><p>Try accessing /api/mood/:subreddit</p>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;