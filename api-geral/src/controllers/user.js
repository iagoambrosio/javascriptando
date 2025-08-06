const userService = require('../services/user');
const { createUserSchema } = require('../schemas/user');

async function createUserController(request, reply) {
  const result = createUserSchema.safeParse(request.body);
  if (!result.success) {
    return reply.status(400).send({ error: result.error.errors });
  }
  const { name, email, password } = result.data;
  try {
    const user = await userService.createUser({ name, email, password });
    reply.status(201).send({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
}

async function getUsersController(request, reply) {
  try {
    const users = await userService.getAllUsers();
    reply.send(users);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
}

async function getUserController(request, reply) {
  const { id, name, email } = request.query;
  try {
    const user = await userService.findUser({ id, name, email });
    if (!user) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }
    reply.send(user);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
}

module.exports = { createUserController, getUsersController, getUserController };
