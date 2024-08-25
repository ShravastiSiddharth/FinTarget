
const RATE_LIMIT = {
    PER_SECOND: 1,
    PER_MINUTE: 20,
};

const logger = require('./logger');

const queueTask = async (redis, user_id) => {
    const queueKey = `user:${user_id}:queue`;
    await redis.lpush(queueKey, Date.now());
};


const processQueue = (redis, user_id) => {
    const queueKey = `user:${user_id}:queue`;
    const secondCounterKey = `user:${user_id}:secondCounter`;
    const minuteCounterKey = `user:${user_id}:minuteCounter`;

    const processTask = async () => {
        const secondCount = await redis.get(secondCounterKey);
        const minuteCount = await redis.get(minuteCounterKey);

        if (secondCount < RATE_LIMIT.PER_SECOND && minuteCount < RATE_LIMIT.PER_MINUTE) {
            const taskTime = await redis.rpop(queueKey);

            if (taskTime) {
                await incrementCounters(redis, secondCounterKey, minuteCounterKey);

                
                console.log(`${user_id} - task completed at - ${new Date(parseInt(taskTime))}`);
                await logger.logTask(user_id);
            }
        }

        setTimeout(processTask, 1000);
    };

    processTask();
};


const incrementCounters = async (redis, secondCounterKey, minuteCounterKey) => {
    await redis.multi()
        .incr(secondCounterKey)
        .expire(secondCounterKey, 1)
        .incr(minuteCounterKey)
        .expire(minuteCounterKey, 60)
        .exec();
};




module.exports = { queueTask, processQueue };
