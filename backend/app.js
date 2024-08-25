const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const Redis = require('ioredis');

const app = express();
app.use(express.json());

const redis = new Redis();
app.use('/api/v1/task', taskRouter(redis));

module.exports = app;
