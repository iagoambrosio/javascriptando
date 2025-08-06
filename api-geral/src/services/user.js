const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function createUser({ name, email, password }) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
}

async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
}

async function findUser({ id, name, email }) {
  const where = {};
  if (id) where.id = Number(id);
  if (name) where.name = name;
  if (email) where.email = email;
  return prisma.user.findFirst({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
}

module.exports = { createUser, getAllUsers, findUser };
