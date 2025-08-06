const { createUserController, getUserController, getUsersController } = require('../controllers/user');

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/user',
    handler: createUserController
  });

  fastify.route({
    method: 'GET',
    url: '/users',
    handler: getUsersController
  });

  fastify.route({
    method: 'GET',
    url: '/user',
    handler: getUserController
  });
};
