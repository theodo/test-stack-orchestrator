import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success } from '@libs/utils';

import type { releaseStackInputSchema } from './input.schema';

const requestStack: CustomAPIGatewayProxyHandler<typeof releaseStackInputSchema, unknown> = async ({
  pathParameters: { stackName },
}) => {
  await Stack.update({ stackName: stackName, isAvailable: true });

  return success({ message: `Stack ${stackName} released` });
};

export const main = applyHttpMiddleware(requestStack);
