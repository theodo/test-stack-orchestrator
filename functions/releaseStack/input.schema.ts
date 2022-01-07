export const releaseStackInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        projectKey: { type: 'string' },
        stackName: { type: 'string' },
      },
      required: ['projectKey', 'stackName'],
    },
  },
  required: ['body'],
} as const;
