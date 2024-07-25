import { FastifyPluginAsync } from 'fastify';

const exampleRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/example', async (request, reply) => {
    const message = fastify.exampleUtil('Hello from route!');
    return { message };
  });
};

export default exampleRoute;
