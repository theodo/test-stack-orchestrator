export const logicalId = <R extends Record<string, unknown>>(resource: R): keyof R => {
  if (Object.keys(resource).length !== 1) {
    throw new Error('logicalId can only be used on one resource');
  }
  const [resourceName] = Object.keys(resource) as (keyof R)[];

  return resourceName;
};
