import { throwIfNil } from '../utils/typeGuards';

/** This are all environment variables which could be used in a lambda
 * Using getEnv with the enum doesn't garanti that the variable will be set
 * because environment variables must be set per lambda.
 * However the Env enum helps to avoid misspelling and getEnv helps to quickly identify when a variable is missing
 */
export enum Env {
  TableName = 'TABLE_NAME',
  CfnRoleArn = 'CFN_ROLE_ARN',
}

export const getEnv = (envVarName: Env): string => {
  const envValue = process.env[envVarName];
  throwIfNil(envValue, `environnement variable ${envVarName} must be defined`);

  return envValue;
};
