import Fastify, { FastifyInstance } from 'fastify';
import examplePlugin from './plugins/sample-plugin';
import exampleRoute from './routes/sample-route';

const server: FastifyInstance = Fastify({
  logger: true
});

server.register(examplePlugin);
server.register(exampleRoute);

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
