export const getAttribute = <R extends Record<string, unknown>>(
  resource: R,
  attribute: string,
): { 'Fn::GetAtt': [keyof R, string] } => {
  const resourceKeys = Object.keys(resource) as (keyof R)[];

  if (resourceKeys.length !== 1) {
    throw new Error('Fn:GetAtt can only be used on one resource');
  }

  const [resourceName] = resourceKeys;

  return { 'Fn::GetAtt': [resourceName, attribute] };
};
