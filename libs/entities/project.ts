import { Entity } from 'dynamodb-toolbox';
import type { EntityItem } from 'dynamodb-toolbox/dist/classes/Entity';

import { LockTable } from '@libs/table';

export const Project = new Entity({
  name: 'Project',
  attributes: {
    modelName: { partitionKey: true, hidden: true, default: 'Project' },
    projectKey: { type: 'string', sortKey: true },
    projectName: { type: 'string', required: true },
    prefix: { type: 'string' },
    initialCommit: { type: 'string' },
  },
  table: LockTable,
} as const);

export type ProjectEntity = EntityItem<typeof Project>;
