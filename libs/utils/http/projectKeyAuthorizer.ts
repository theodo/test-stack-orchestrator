import { Unauthorized } from 'http-errors';

import { Project } from '@libs/entities/project';

export const projectKeyAuthorizer = async (projectKey: string): Promise<void> => {
  const { Item: project } = await Project.get({ projectKey });
  if (project === undefined) {
    throw new Unauthorized();
  }
};
