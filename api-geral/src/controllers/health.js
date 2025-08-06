const healthService = require('../services/health');

async function healthController(request, reply) {
  const status = healthService.getStatus();
  reply.send({ status });
}

module.exports = { healthController };
