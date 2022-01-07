export const requestStackInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        branch: { type: 'string' },
      },
    },
  },
} as const;
