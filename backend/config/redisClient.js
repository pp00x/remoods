// config/redisClient.js
const Redis = require('ioredis');

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
console.log(`Attempting to connect to Redis at ${redisHost}:${redisPort}`);

const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
  password: process.env.REDIS_PASSWORD || undefined,
  // Consider adding a connectTimeout if issues persist, though ETIMEDOUT usually means a more fundamental connectivity problem.
  // connectTimeout: 15000, // e.g., 15 seconds
});

redisClient.on('connect', () => {
  console.log(`Successfully connected to Redis at ${redisHost}:${redisPort}`);
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;