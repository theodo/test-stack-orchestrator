import { Entity } from 'dynamodb-toolbox';
import type { EntityItem } from 'dynamodb-toolbox/dist/classes/Entity';

import { LockTable } from '@libs/table';

export const Stack = new Entity({
  name: 'Stack',
  attributes: {
    modelName: { partitionKey: true, hidden: true, default: 'Stack' },
    stackName: { type: 'string', sortKey: true },
    isAvailable: { type: 'boolean', required: true },
    branch: { type: 'string', required: true },
  },
  table: LockTable,
} as const);

export type StackEntity = EntityItem<typeof Stack>;
