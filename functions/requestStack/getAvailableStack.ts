import type { EntityItem } from 'dynamodb-toolbox/dist/classes/Entity';

import type { Stack, StackEntity } from '@libs/entities/stack';

export const getAvailableStack = (
  stacks: StackEntity[],
  branch: string,
): EntityItem<typeof Stack> | undefined => {
  const availableStacks = stacks.filter(({ isAvailable }) => isAvailable);

  if (availableStacks.length === 0) {
    return;
  }

  const stackOfSameBranch = availableStacks.find(
    ({ branch: stackBranch }) => stackBranch === branch,
  );
  if (stackOfSameBranch) {
    return stackOfSameBranch;
  }

  const sortedStacksByUpdatedAt = availableStacks.sort(
    ({ modified: modifiedA }, { modified: modifiedB }) =>
      new Date(modifiedA).getTime() - new Date(modifiedB).getTime(),
  );

  return sortedStacksByUpdatedAt[0];
};
