import {createClient} from 'redis';

const redis = createClient({
    url: process.env.REDIS_URL
});

redis.on('error', (err) => console.error('Redis client error', err));

export async function connectRedis() {
    if (!redis.isOpen) {
        await redis.connect();
    }
}

export {redis};