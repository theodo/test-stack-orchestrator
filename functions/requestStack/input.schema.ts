export const requestStackInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        branch: { type: 'string' },
      },
    },
    headers: {
      type: 'object',
      properties: {
        'x-api-key': { type: 'string' },
      },
      required: ['x-api-key'],
    },
  },
  required: ['headers'],
} as const;
