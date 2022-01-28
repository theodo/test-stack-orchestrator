import { listStacksInputSchema } from '@functions/listStacks/input.schema';
import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success, throwIfNil } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

const listStacks: CustomAPIGatewayProxyHandler<typeof listStacksInputSchema, unknown> = async ({
  headers: { 'x-api-key': projectKey },
}) => {
  await projectKeyAuthorizer(projectKey);

  const { Items: stacks } = await Stack.query(Stack.name, { beginsWith: projectKey });

  throwIfNil(stacks, 'stacks must exist');

  return success({ stacks: stacks });
};

export const main = applyHttpMiddleware(listStacks, { inputSchema: listStacksInputSchema });
