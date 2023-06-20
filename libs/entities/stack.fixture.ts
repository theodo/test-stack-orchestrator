import type { StackEntity } from '@libs/entities/stack';

export const stackFixtureFactory = (params: Partial<StackEntity> = {}): StackEntity => ({
  stackName: 'stack1',
  isAvailable: true,
  branch: 'branch1',
  created: '2021-12-10T22:13:17Z',
  modified: '2021-12-10T23:13:17Z',
  entity: 'Stack',
  projectKey: 'project1',
  ...params,
});
