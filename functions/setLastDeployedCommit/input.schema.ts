export const setLastDeployedCommitInputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        stackName: { type: 'string' },
        lastDeployedCommit: { type: 'string' },
      },
      required: ['stackName', 'lastDeployedCommit'],
      additionalProperties: false,
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
