const Redis = require('ioredis');
require('dotenv').config();
const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    tls: {
        rejectUnauthorized: false
      }
});

module.exports = redis;
