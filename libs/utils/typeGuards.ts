import isNil from 'lodash/isNil';

// Asserts is not supported by arrow functions
export function throwIfNil<T>(
  x: T | null | undefined,
  message = 'This should never happen',
): asserts x is T {
  if (isNil(x)) {
    throw new Error(message);
  }
}

// Asserts is not supported by arrow functions
// It's more convenient to have 3 params
// eslint-disable-next-line max-params
export function asserts<T, AssertedType extends T>(
  x: T,
  typeGuard: (x: T) => x is AssertedType,
  message = 'This should never happen',
): asserts x is AssertedType {
  if (!typeGuard(x)) {
    throw new Error(message);
  }
}

export const isTruthy = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;
