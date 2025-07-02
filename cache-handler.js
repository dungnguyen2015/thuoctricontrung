const redis = require('ioredis');

const client = new Redis(process.env.REDIS_URL);

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
  }

  async get(key) {
    const data = await client.get(`cache:${key}`);
    return data ? JSON.parse(data) : null;
  }

  async set(key, data) {
    await client.setex(`cache:${key}`, 3600, JSON.stringify(data)); // Cache 1h
  }

  async revalidateTag(tag) {
    const keys = await client.keys(`cache:*:tags:${tag}`);
    await Promise.all(keys.map(key => client.del(key)));
  }
}