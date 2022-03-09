import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

import { setLastDeployedCommitInputSchema } from './input.schema';

const setLastDeployedCommit: CustomAPIGatewayProxyHandler<
  typeof setLastDeployedCommitInputSchema,
  unknown
> = async ({ body: { stackName, lastDeployedCommit }, headers: { 'x-api-key': projectKey } }) => {
  await projectKeyAuthorizer(projectKey);
  await Stack.update({ projectKey, stackName, lastDeployedCommit });

  return success({ message: `Last commit of stack ${stackName} updated` });
};

export const main = applyHttpMiddleware(setLastDeployedCommit, {
  inputSchema: setLastDeployedCommitInputSchema,
});
