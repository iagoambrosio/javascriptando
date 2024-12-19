import z from 'zod';
import type { FastifyTypedInstance } from '../types';
import { randomUUID } from 'node:crypto';

interface Data {
  id: string;
  content: string;
}

const dataStore: Data[] = [];

export default async function dataRoutes(app: FastifyTypedInstance) {
  app.get('/data', {
    schema: {
      tags: ['data'],
      description: 'List data',
      response: {
        200: z.array(z.object({
          id: z.string(),
          content: z.string(),
        }))
      }
    },
  }, async () => {
    return dataStore;
  });

  app.post('/data', {
    schema: {
      tags: ['data'],
      description: 'Create a new data entry',
      body: z.object({
        content: z.string(),
      }),
      response: { 201: z.null().describe('Data entry created') }
    },
  }, async (request, reply) => {
    const { content } = request.body as { content: string };

    dataStore.push({
      id: randomUUID(),
      content,
    });

    return reply.status(201).send();
  });
}
