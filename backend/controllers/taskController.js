const { queueTask, processQueue } = require('../services/taskQueue');

const handleTask = (redis) => async (req, res) => {
    const { user_id } = req.body;

    try {
       
        await queueTask(redis, user_id);

       
        processQueue(redis, user_id);

        res.status(200).json({ message: 'Task queued successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleTask };
