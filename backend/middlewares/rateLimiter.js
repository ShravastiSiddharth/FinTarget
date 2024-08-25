const redis = require('../config/redisConfig');

const rateLimiter = (req, res, next) => {
    const { user_id } = req.body;
    const currentTime = Math.floor(Date.now() / 1000);

    
    const userKey = `rate:${user_id}`;
    const userMinuteKey = `minute:${user_id}`;

    redis.multi()
        .incr(userKey)
        .expire(userKey, 1)
        .incr(userMinuteKey)
        .expire(userMinuteKey, 60)
        .exec((err, replies) => {
            const tasksPerSecond = replies[0][1];
            const tasksPerMinute = replies[2][1];

            if (tasksPerSecond > 1 || tasksPerMinute > 20) {
                return res.status(429).json({ message: "Rate limit exceeded. Please wait." });
            }
            next();
        });
};

module.exports = rateLimiter;
