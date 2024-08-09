import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * to creat a class redis
 */

class RedisClient {
  /**
   * to creat new RedisClient
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * returns true when the connection to Redis is a success
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * takes a string key as argument and returns the Redis value stored for this key
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * takes a string key, a value and a duration in second as arguments to store
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * to delete
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
