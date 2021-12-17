import { stackFixtureFactory } from '@libs/entities/stack.fixture';

import { getAvailableStack } from './getAvailableStack';

const myBranch = 'my-branch';
describe('getAvailableStack', () => {
  it('returns undefined if there is no stack', () => {
    expect(getAvailableStack([], myBranch)).toBeUndefined();
  });
  it('returns undefined if there is no available stack', () => {
    expect(
      getAvailableStack(
        [stackFixtureFactory({ isAvailable: false }), stackFixtureFactory({ isAvailable: false })],
        myBranch,
      ),
    ).toBeUndefined();
  });
  it('returns a stack of the same branch if there is one available', () => {
    const expectedStack = stackFixtureFactory({ isAvailable: true, branch: myBranch });
    expect(
      getAvailableStack(
        [
          stackFixtureFactory({ isAvailable: false, branch: myBranch }),
          stackFixtureFactory({ isAvailable: true, branch: 'aBranch' }),
          expectedStack,
          stackFixtureFactory({ isAvailable: true, branch: 'anotherBranch' }),
        ],
        myBranch,
      ),
    ).toEqual(expectedStack);
  });
  it('returns the oldest available stack otherwise', () => {
    const expectedStack = stackFixtureFactory({
      isAvailable: true,
      modified: '2021-12-10T23:00:00Z',
    });
    expect(
      getAvailableStack(
        [
          stackFixtureFactory({ isAvailable: false, modified: '2021-12-10T22:00:00Z' }),
          stackFixtureFactory({ isAvailable: true, modified: '2021-12-10T23:00:01Z' }),
          expectedStack,
          stackFixtureFactory({ isAvailable: true, modified: '2021-12-11T23:00:00Z' }),
        ],
        myBranch,
      ),
    ).toEqual(expectedStack);
  });
});
