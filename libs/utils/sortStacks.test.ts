import { stackFixtureFactory } from '@libs/entities/stack.fixture';

import { DEFAULT_STACK_PREFIX } from './constants';
import { getStackNumber, sortStacks } from './sortStacks';

const project = { prefix: 'test-N-' };

const unsortedStacks = [
  stackFixtureFactory({ stackName: 'test-N-10' }),
  stackFixtureFactory({ stackName: 'test-N-1' }),
  stackFixtureFactory({ stackName: 'test-N-9' }),
];

const sortedStacks = [
  stackFixtureFactory({ stackName: 'test-N-1' }),
  stackFixtureFactory({ stackName: 'test-N-9' }),
  stackFixtureFactory({ stackName: 'test-N-10' }),
];

const unsortedStacksWithoutPrefix = [
  stackFixtureFactory({ stackName: 'test-10' }),
  stackFixtureFactory({ stackName: 'test-1' }),
  stackFixtureFactory({ stackName: 'test-9' }),
];

const sortedStacksWithoutPrefix = [
  stackFixtureFactory({ stackName: 'test-1' }),
  stackFixtureFactory({ stackName: 'test-9' }),
  stackFixtureFactory({ stackName: 'test-10' }),
];

describe('getStackNumber', () => {
  it('should return the stack number when the project has a prefix', () => {
    const stackNumber = getStackNumber(unsortedStacks[0], project.prefix);
    expect(stackNumber).toEqual(10);
  });

  it('should return the stack number when the project does not have a prefix', () => {
    const stackNumber = getStackNumber(unsortedStacksWithoutPrefix[0], DEFAULT_STACK_PREFIX);
    expect(stackNumber).toEqual(10);
  });
});

describe('sortStacks', () => {
  it('should sort stacks numerically when the project has a prefix', () => {
    const stacks = sortStacks(unsortedStacks, project.prefix);
    expect(stacks).toEqual(sortedStacks);
  });

  it('should sort stacks alphabetically when the project does not have a prefix', () => {
    const stacks = sortStacks(unsortedStacksWithoutPrefix, DEFAULT_STACK_PREFIX);
    expect(stacks).toEqual(sortedStacksWithoutPrefix);
  });
});
