import z from 'zod';
import type { FastifyTypedInstance } from '../types';
import { randomUUID } from 'node:crypto';

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export default async function routes(app: FastifyTypedInstance) {
  app.get('/users', {
    schema: {
      tags: ['users'],
      description: 'List users',
      response: {
        200: z.array(z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
        }))
      }
    },
  }, async () => {
    return users;
  });

  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      response: { 201: z.null().describe('User created') }
    },
  }, async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };

    users.push({
      id: randomUUID(),
      name,
      email,
    });

    return reply.status(201).send();
  });
}

