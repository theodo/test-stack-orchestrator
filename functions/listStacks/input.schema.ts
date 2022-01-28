export const listStacksInputSchema = {
  type: 'object',
  properties: {
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
