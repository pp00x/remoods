// config/redisClient.js
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;