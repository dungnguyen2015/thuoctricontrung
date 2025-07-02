import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true
});

export async function cacheResponse(key: string, data: any, ttl = 3600) {
  await redis.setex(`app:${key}`, ttl, JSON.stringify(data));
}

export async function getCached(key: string) {
  const data = await redis.get(`app:${key}`);
  return data ? JSON.parse(data) : null;
}

export const articleCache = {
  get: async (key: string) => {
    const data = await redis.get(`articles:${key}`)
    return data ? JSON.parse(data) : null
  },
  set: async (key: string, data: any, ttl = 3600) => {
    await redis.setex(`articles:${key}`, ttl, JSON.stringify(data))
  }
}