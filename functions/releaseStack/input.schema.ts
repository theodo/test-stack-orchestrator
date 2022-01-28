export const releaseStackInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        stackName: { type: 'string' },
      },
      required: ['stackName'],
    },
    headers: {
      type: 'object',
      properties: {
        'x-api-key': { type: 'string' },
      },
      required: ['x-api-key'],
    },
  },
  required: ['body', 'headers'],
} as const;
