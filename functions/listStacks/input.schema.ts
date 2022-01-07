export const listStacksInputSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        projectKey: { type: 'string' },
      },
      required: ['projectKey'],
    },
  },
  required: ['pathParameters'],
} as const;
