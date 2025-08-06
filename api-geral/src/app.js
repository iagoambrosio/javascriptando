const fastify = require('fastify')({ logger: true });
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');

// Register Swagger (OpenAPI)
fastify.register(swagger, {
  openapi: {
    info: {
      title: 'API Geral',
      description: 'API documentation',
      version: '1.0.0'
    }
  }
});
fastify.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});

// Register routes
fastify.register(require('./routes/health'));
fastify.register(require('./routes/user'));

module.exports = fastify;
