import { FastifyPluginAsync } from "fastify";
import { RedisService } from '../services/redisService';
import { RedisController } from '../controllers/redisController';
import { SetMessageParams, SetMessageBody } from '../interfaces/redis';

const redisRoute: FastifyPluginAsync = async (fastify, options) => {
  const redisService = new RedisService(fastify);
  const redisController = new RedisController(redisService);

  fastify.post<{
    Params: SetMessageParams;
    Body: SetMessageBody;
  }>("/redis/:key", {
    schema: {
      description: 'Set a message in Redis',
      tags: ['redis'],
      summary: 'Store a message in Redis with the given key',
      params: {
        type: 'object',
        properties: {
          key: { type: 'string', description: 'Redis key for the message' }
        },
        required: ['key']
      },
      body: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Message to be stored' }
        },
        required: ['message']
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, redisController.setMessage.bind(redisController));

  fastify.get<{
    Params: SetMessageParams;
  }>("/redis/:key", {
    schema: {
      description: 'Get a message from Redis',
      tags: ['redis'],
      summary: 'Retrieve a message from Redis by key',
      params: {
        type: 'object',
        properties: {
          key: { type: 'string', description: 'Redis key for the message' }
        },
        required: ['key']
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        404: {
          description: 'Message not found',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, redisController.getMessage.bind(redisController));
};

export default redisRoute;
