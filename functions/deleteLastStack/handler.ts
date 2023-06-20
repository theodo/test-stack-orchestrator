import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

import { releaseStackInputSchema } from './input.schema';

const deleteLastStack: CustomAPIGatewayProxyHandler<
  typeof releaseStackInputSchema,
  unknown
> = async ({ headers: { 'x-api-key': projectKey } }: { headers: { 'x-api-key': string } }) => {
  await projectKeyAuthorizer(projectKey);
  const { Items: stacks } = await Stack.query(Stack.name, { beginsWith: projectKey });
  if (stacks === undefined || stacks.length === 0) {
    return success({ message: `No more stack` });
  }
  const lastStack = stacks[stacks.length - 1];
  const { stackName } = lastStack;
  await Stack.delete({ projectKey, stackName });

  return success({ message: `Stack ${stackName} deleted` });
};

export const main = applyHttpMiddleware(deleteLastStack, { inputSchema: releaseStackInputSchema });
