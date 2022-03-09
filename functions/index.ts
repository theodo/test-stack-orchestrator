import deleteLastStack from './deleteLastStack/config';
import listStacks from './listStacks/config';
import releaseStack from './releaseStack/config';
import requestStack from './requestStack/config';
import setLastDeployedCommit from './setLastDeployedCommit/config';

export const functions = {
  requestStack,
  releaseStack,
  listStacks,
  deleteLastStack,
  setLastDeployedCommit,
};
