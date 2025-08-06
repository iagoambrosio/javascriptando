const { z } = require('zod');

const responseSchema = z.object({
  status: z.string()
});

const healthSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      }
    }
  }
};

module.exports = { healthSchema };
