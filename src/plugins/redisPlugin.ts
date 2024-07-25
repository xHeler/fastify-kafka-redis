import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    setRedisMessage(key: string, message: string): Promise<void>;
    getRedisMessage(key: string): Promise<string | null>;
  }
}

const redisPlugin: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.decorate('setRedisMessage', async function(key: string, message: string): Promise<void> {
    try {
      await this.redis.set(key, message);
    } catch (error) {
      this.log.error(`Failed to set Redis message for key ${key}: ${error}`);
      throw new Error('Internal Server Error');
    }
  });

  fastify.decorate('getRedisMessage', async function(key: string): Promise<string | null> {
    try {
      const message = await this.redis.get(key);
      return message;
    } catch (error) {
      this.log.error(`Failed to get Redis message for key ${key}: ${error}`);
      throw new Error('Internal Server Error');
    }
  });
});

export default redisPlugin;
