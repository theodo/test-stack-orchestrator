export const releaseStackInputSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        stackName: { type: 'string' },
      },
      required: ['stackName'],
    },
  },
  required: ['pathParameters'],
} as const;
