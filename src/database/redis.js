const redis = require('redis');
module.exports = {
    client: () => redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    }),
};