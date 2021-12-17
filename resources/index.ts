import type { CloudFormationTemplate } from '../configHelpers';
import { cdkApp, cdkStack } from './cdkStack';

export const cdkAppCloudFormationTemplate = cdkApp.synth().getStackByName(cdkStack.stackName)
  .template as CloudFormationTemplate;

const Resources = {
  ...cdkAppCloudFormationTemplate.Resources,
};

const Outputs = {
  ...cdkAppCloudFormationTemplate.Outputs,
};

const Conditions = {
  ...cdkAppCloudFormationTemplate.Conditions,
};

export const resources = {
  Description: 'Canopia test stack',
  Resources,
  Outputs,
  Conditions,
};
