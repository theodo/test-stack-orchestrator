import { logicalId } from './logicalId';

export const ref = <R extends Record<string, unknown>>(resource: R): { Ref: keyof R } => ({
  Ref: logicalId(resource),
});
