import omit from 'lodash/omit';

import { listStacksInputSchema } from '@functions/listStacks/input.schema';
import { Project } from '@libs/entities/project';
import { Stack } from '@libs/entities/stack';
import { applyHttpMiddleware } from '@libs/middlewares';
import type { CustomAPIGatewayProxyHandler } from '@libs/utils';
import { sortStacks, success, throwIfNil } from '@libs/utils';
import { projectKeyAuthorizer } from '@libs/utils/http/projectKeyAuthorizer';

const listStacks: CustomAPIGatewayProxyHandler<typeof listStacksInputSchema, unknown> = async ({
  headers: { 'x-api-key': projectKey },
}) => {
  await projectKeyAuthorizer(projectKey);

  const { Items: stacks } = await Stack.query(Stack.name, { beginsWith: projectKey });
  const { Item: project } = await Project.get({ projectKey });

  throwIfNil(stacks, 'stacks must exist');
  const sortedStacks = sortStacks(stacks, project?.prefix);

  return success({
    stacks: sortedStacks.map(stack => omit(stack, 'projectKey')),
  });
};

export const main = applyHttpMiddleware(listStacks, { inputSchema: listStacksInputSchema });
