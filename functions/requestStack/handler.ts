import { getAvailableStack } from '@functions/requestStack/getAvailableStack';
import { requestStackInputSchema } from '@functions/requestStack/input.schema';
import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { success, throwIfNil } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

const defaultBranch = 'main';
const requestStack: CustomAPIGatewayProxyHandler<typeof requestStackInputSchema, unknown> = async ({
  body: { projectKey, branch = defaultBranch },
}) => {
  await projectKeyAuthorizer(projectKey);

  const { Items: stacks } = await Stack.query(Stack.name, { beginsWith: projectKey });

  throwIfNil(stacks, 'stacks must exist');

  const availableStack = getAvailableStack(stacks, branch);

  if (availableStack !== undefined) {
    await Stack.update(
      { projectKey, stackName: availableStack.stackName, isAvailable: false, branch },
      { conditions: { attr: 'isAvailable', eq: true } },
    );

    return success({ stackName: availableStack.stackName });
  }
  const newStackName = `test-${stacks.length + 1}`;
  await Stack.put({ projectKey, stackName: newStackName, isAvailable: false, branch });

  return success({ stackName: newStackName });
};

export const main = applyHttpMiddleware(requestStack, { inputSchema: requestStackInputSchema });
