const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const redis = require('./config/redisConfig')

const app = express();
app.use(express.json());


app.use('/api/v1/task', taskRouter(redis));

module.exports = app;
