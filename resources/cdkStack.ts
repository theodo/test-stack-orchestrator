import { App, Stack } from '@aws-cdk/core';

import { setupDynamoDb } from './dynamodb';

const app = new App();
const stack = new Stack(app);

setupDynamoDb(stack);

export { app as cdkApp, stack as cdkStack };
