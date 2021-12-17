export const requestStackInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        branch: { type: 'string' },
      },
      required: ['branch'],
    },
  },
  required: ['body'],
} as const;
