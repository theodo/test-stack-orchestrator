import { getAvailableStack } from '@functions/requestStack/getAvailableStack';
import { requestStackInputSchema } from '@functions/requestStack/input.schema';
import { Project } from '@libs/entities/project';
import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { DEFAULT_STACK_PREFIX, success, throwIfNil } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

const defaultBranch = 'main';
const requestStack: CustomAPIGatewayProxyHandler<typeof requestStackInputSchema, unknown> = async ({
  body: { branch = defaultBranch } = { branch: defaultBranch },
  headers: { 'x-api-key': projectKey },
}: {
  body?: { branch?: string } | undefined;
  headers: { 'x-api-key': string };
}) => {
  await projectKeyAuthorizer(projectKey);

  const { Items: stacks } = await Stack.query(Stack.name, { beginsWith: projectKey });
  const { Item: project } = await Project.get({ projectKey });

  throwIfNil(stacks, 'stacks must exist');
  throwIfNil(project);

  const { initialCommit, prefix = DEFAULT_STACK_PREFIX } = project;

  const availableStack = getAvailableStack(stacks, branch);

  if (availableStack !== undefined) {
    const { stackName, lastDeployedCommit = initialCommit } = availableStack;
    await Stack.update(
      { projectKey, stackName, isAvailable: false, branch },
      { conditions: { attr: 'isAvailable', eq: true } },
    );

    return success({ stackName, lastDeployedCommit });
  }

  const newStackName = `${prefix}${stacks.length + 1}`;
  await Stack.put({ projectKey, stackName: newStackName, isAvailable: false, branch });

  return success({ stackName: newStackName, lastDeployedCommit: initialCommit });
};

export const main = applyHttpMiddleware(requestStack, { inputSchema: requestStackInputSchema });
