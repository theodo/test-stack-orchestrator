import { getAvailableStack } from '@functions/requestStack/getAvailableStack';
import { requestStackInputSchema } from '@functions/requestStack/input.schema';
import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success, throwIfNil } from '@libs/utils';

const requestStack: CustomAPIGatewayProxyHandler<typeof requestStackInputSchema, unknown> = async ({
  body: { branch },
}) => {
  const { Items: stacks } = await Stack.query(Stack.name);

  throwIfNil(stacks, 'stacks must exist');

  const availableStack = getAvailableStack(stacks, branch);

  if (availableStack !== undefined) {
    await Stack.update(
      { stackName: availableStack.stackName, isAvailable: false, branch },
      { conditions: { attr: 'isAvailable', eq: true } },
    );

    return success({ stackName: availableStack.stackName });
  }
  const newStackName = `test-N-${stacks.length + 1}`;
  await Stack.put({ stackName: newStackName, isAvailable: false, branch });

  return success({ stackName: newStackName });
};

export const main = applyHttpMiddleware(requestStack, { inputSchema: requestStackInputSchema });
