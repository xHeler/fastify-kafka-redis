import { FastifyReply, FastifyRequest } from 'fastify';
import { SetMessageParams, SetMessageBody } from '../interfaces/redis';
import { RedisService } from '../services/redisService';

export class RedisController {
  constructor(private redisService: RedisService) {}

  async setMessage(request: FastifyRequest<{
    Params: SetMessageParams;
    Body: SetMessageBody;
  }>, reply: FastifyReply): Promise<void> {
    const { key } = request.params;
    const { message } = request.body;

    await this.redisService.setMessage(key, message);
    reply.code(201).send({ success: true });
  }

  async getMessage(request: FastifyRequest<{
    Params: SetMessageParams;
  }>, reply: FastifyReply): Promise<void> {
    const { key } = request.params;

    const result = await this.redisService.getMessage(key);
    if (result === null) {
      reply.code(404).send({ error: 'Message not found' });
    } else {
      reply.send(result);
    }
  }
}
