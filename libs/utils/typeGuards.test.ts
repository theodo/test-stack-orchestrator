import { throwIfNil } from './typeGuards';

describe('throwIfNil', () => {
  it.each`
    value        | throws
    ${null}      | ${true}
    ${undefined} | ${true}
    ${0}         | ${false}
    ${''}        | ${false}
    ${{}}        | ${false}
  `(
    'for value = $value, it throws: $throws',
    ({ value, throws }: { value: unknown; throws: boolean }) => {
      if (throws) {
        expect(() => throwIfNil(value)).toThrow();
      } else {
        expect(() => throwIfNil(value)).not.toThrow();
      }
    },
  );
});
