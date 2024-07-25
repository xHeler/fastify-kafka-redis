import { FastifyInstance } from 'fastify';
import { RedisMessage } from '../interfaces/redis';

export class RedisService {
  constructor(private fastify: FastifyInstance) {}

  async setMessage(key: string, message: string): Promise<void> {
    try {
      await this.fastify.redis.set(key, message);
    } catch (error) {
      this.fastify.log.error(`Failed to set Redis message for key ${key}: ${error}`);
      throw new Error('Failed to set message in Redis');
    }
  }

  async getMessage(key: string): Promise<RedisMessage | null> {
    try {
      const message = await this.fastify.redis.get(key);
      return message ? { key, message } : null;
    } catch (error) {
      this.fastify.log.error(`Failed to get Redis message for key ${key}: ${error}`);
      throw new Error('Failed to get message from Redis');
    }
  }
}
