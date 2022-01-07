export const requestStackInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        branch: { type: 'string' },
        projectKey: { type: 'string' },
      },
      required: ['projectKey'],
    },
  },
  required: ['body'],
} as const;
