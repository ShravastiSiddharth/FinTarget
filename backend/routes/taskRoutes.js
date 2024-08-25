const express = require('express');
const { handleTask } = require('../controllers/taskController');
const rateLimiter = require('../middlewares/rateLimiter')

module.exports = (redis) => {
    const router = express.Router();
    router.post('/',rateLimiter, handleTask(redis));
    return router;
};
