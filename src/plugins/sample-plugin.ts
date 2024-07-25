import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const examplePlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.decorate('exampleUtil', (msg: string) => `Util says: ${msg}`);
};

export default fp(examplePlugin);
