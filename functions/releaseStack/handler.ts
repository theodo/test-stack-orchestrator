import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

import { releaseStackInputSchema } from './input.schema';

const requestStack: CustomAPIGatewayProxyHandler<typeof releaseStackInputSchema, unknown> = async ({
  body: { stackName },
  headers: { 'x-api-key': projectKey },
}) => {
  await projectKeyAuthorizer(projectKey);
  await Stack.update({ projectKey, stackName: stackName, isAvailable: true });

  return success({ message: `Stack ${stackName} released` });
};

export const main = applyHttpMiddleware(requestStack, { inputSchema: releaseStackInputSchema });
