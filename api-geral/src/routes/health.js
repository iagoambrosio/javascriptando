const { healthController } = require('../controllers/health');
const { healthSchema } = require('../schemas/health');

module.exports = async function (fastify) {
  fastify.route({
    method: 'GET',
    url: '/health',
    schema: healthSchema,
    handler: healthController
  });
};
