import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

import { releaseStackInputSchema } from './input.schema';

const releaseStack: CustomAPIGatewayProxyHandler<typeof releaseStackInputSchema, unknown> = async ({
  body: { stackName },
  headers: { 'x-api-key': projectKey },
}: {
  body: { stackName: string };
  headers: { 'x-api-key': string };
}) => {
  await projectKeyAuthorizer(projectKey);
  await Stack.update(
    { projectKey, stackName, isAvailable: true },
    { conditions: { attr: 'stackName', exists: true } },
  );

  return success({ message: `Stack ${stackName} released` });
};

export const main = applyHttpMiddleware(releaseStack, { inputSchema: releaseStackInputSchema });
