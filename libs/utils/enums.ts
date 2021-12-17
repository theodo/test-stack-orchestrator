export const enumKeys = (theEnum: { [key: string]: unknown }): string[] =>
  Object.keys(theEnum).filter(key => Number.isNaN(Number(key)));

export const enumValues = <T>(theEnum: { [key: string]: T }): T[] =>
  enumKeys(theEnum).map(key => (theEnum as { [key: string]: T })[key]);
