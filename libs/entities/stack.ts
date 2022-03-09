import { Entity } from 'dynamodb-toolbox';
import type { EntityItem } from 'dynamodb-toolbox/dist/classes/Entity';

import { LockTable } from '@libs/table';

export const Stack = new Entity({
  name: 'Stack',
  attributes: {
    modelName: { partitionKey: true, hidden: true, default: 'Stack' },
    SK: { type: 'string', sortKey: true, hidden: true },
    projectKey: ['SK', 0, { type: 'string', required: true }],
    stackName: ['SK', 1, { type: 'string', required: true }],
    isAvailable: { type: 'boolean', required: true },
    branch: { type: 'string', required: true },
    lastDeployedCommit: { type: 'string' },
  },
  table: LockTable,
} as const);

export type StackEntity = EntityItem<typeof Stack>;
