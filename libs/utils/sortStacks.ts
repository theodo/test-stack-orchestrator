import type { StackEntity } from '@libs/entities/stack';

import { DEFAULT_STACK_PREFIX } from './constants';

export const getStackNumber = (stack: StackEntity, prefix: string): number =>
  Number(stack.stackName.split(prefix)[1]);

export const sortStacks = (
  stacks: StackEntity[],
  projectPrefix: string | undefined,
): StackEntity[] => {
  const prefix = projectPrefix !== undefined ? projectPrefix : DEFAULT_STACK_PREFIX;

  return stacks.sort(
    (stackA, stackB) => getStackNumber(stackA, prefix) - getStackNumber(stackB, prefix),
  );
};
