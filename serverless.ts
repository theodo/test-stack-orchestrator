import type { AWS } from '@serverless/typescript';

import { DynamoDbTableNameOutputId } from '@resources/dynamodb';

import { AppEnv, esbuildConfig, region } from './config';
import { getOutputValue } from './configHelpers';
import { functions } from './functions';
import { cdkAppCloudFormationTemplate, resources } from './resources';

const serverlessConfiguration: AWS = {
  service: `test-stack-orchestrator`, // Keep it short to have role name below 64
  frameworkVersion: '>=2.50.0',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    architecture: 'arm64',
    region,
    profile: 'test-stack-orchestrator',
    stage: `\${opt:stage, '${AppEnv.Dev}'}`, // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    lambdaHashingVersion: '20201221',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TABLE_NAME: getOutputValue(cdkAppCloudFormationTemplate, DynamoDbTableNameOutputId),
    },
    eventBridge: {
      useCloudFormation: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Resource: ['*'],
        Action: [
          'dynamodb:PutItem',
          'dynamodb:Query',
          'dynamodb:GetItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:BatchWriteItem',
        ],
      },
    ],
  },
  package: { individually: true },
  functions,
  custom: {
    esbuild: esbuildConfig,
  },
  // @ts-expect-error types are wrong https://github.com/serverless/typescript/issues/27
  resources,
};

module.exports = serverlessConfiguration;
