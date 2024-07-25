import Fastify, { FastifyInstance } from "fastify";
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyRedis from "@fastify/redis";
import redisRoute from "./routes/redisRoute";
import { config } from "./configs/config";

class Server {
  private fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
  }

  async setup(): Promise<void> {
    await this.registerPlugins();

    await this.registerRoutes();

    this.addErrorHandler();
  }

  private async registerPlugins(): Promise<void> {

    await this.fastify.register(require('@fastify/cors'), {
      origin: true
    })
    

    await this.fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'Fastify API with Swagger',
          version: '1.0.0'
        },
        servers: [
          {
            url: `http://${config.server.host}:${config.server.port}`
          }
        ],
        tags: [
          { name: 'Redis', description: 'Redis related endpoints' }
        ],
        
      }
    });

    await this.fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      staticCSP: false,
      transformStaticCSP: (header) => header,
    });

    await this.fastify.register(fastifyRedis, {
      host: config.redis.host,
      port: config.redis.port,
    });
  }

  private async registerRoutes(): Promise<void> {
    await this.fastify.register(redisRoute, { prefix: "/api" });
  }

  private addErrorHandler(): void {
    this.fastify.setErrorHandler((error, request, reply) => {
      this.fastify.log.error(error);
      reply.status(500).send({ error: "Internal Server Error" });
    });
  }

  async start(): Promise<void> {
    try {
      await this.fastify.listen({
        port: config.server.port,
        host: config.server.host,
      });
      this.fastify.log.info(
        `Server is running on ${config.server.host}:${config.server.port}`
      );
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}

const server = new Server();

async function bootstrap() {
  try {
    await server.setup();
    await server.start();
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

bootstrap();
