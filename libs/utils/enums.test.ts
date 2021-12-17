import { enumKeys, enumValues } from './enums';

describe('Utils', () => {
  describe('Enum iterators', () => {
    enum classicalEnum {
      A,
      B,
      C,
    }

    enum stringEnum {
      A = 'a',
      B = 'b',
      C = 'c',
    }

    enum heterogeneousEnum {
      A,
      B = 2,
      C = 'c',
    }

    describe('enumKeys', () => {
      [classicalEnum, stringEnum, heterogeneousEnum].forEach(theEnum => {
        it('returns the keys', () => {
          expect(enumKeys(theEnum)).toEqual(['A', 'B', 'C']);
        });
      });
    });

    describe('enumValues', () => {
      it('returns the values with classicalEnum', () => {
        expect(enumValues(classicalEnum)).toEqual([0, 1, 2]);
      });

      it('returns the values with stringEnum', () => {
        expect(enumValues(stringEnum)).toEqual(['a', 'b', 'c']);
      });

      it('returns the values with heterogeneousEnum', () => {
        expect(enumValues(heterogeneousEnum)).toEqual([0, 2, 'c']);
      });
    });
  });
});
