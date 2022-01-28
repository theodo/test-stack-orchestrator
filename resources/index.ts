import type { CloudFormationTemplate } from '../configHelpers';
import { ApiAliasRecord, ApiMapping, DomainName } from './apiGateway';
import { cdkApp, cdkStack } from './cdkStack';
import { ApiCertificate, ApiHostedZone } from './hostedZone';

export const cdkAppCloudFormationTemplate = cdkApp.synth().getStackByName(cdkStack.stackName)
  .template as CloudFormationTemplate;

const Resources = {
  ...cdkAppCloudFormationTemplate.Resources,
  ApiAliasRecord,
  ApiMapping,
  DomainName,
  ApiCertificate,
  ApiHostedZone,
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
