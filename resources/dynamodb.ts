import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import type { Stack } from '@aws-cdk/core';
import { CfnOutput } from '@aws-cdk/core';

export const DynamoDbTableNameOutputId = 'DynamoDbTableNameOutputId';

export const PARTITION_KEY = 'PK';
export const SORT_KEY = 'SK';

export const setupDynamoDb = (stack: Stack): void => {
  const table = new Table(stack, 'LockTable', {
    partitionKey: { name: PARTITION_KEY, type: AttributeType.STRING },
    sortKey: { name: SORT_KEY, type: AttributeType.STRING },
    billingMode: BillingMode.PAY_PER_REQUEST,
  });

  new CfnOutput(stack, DynamoDbTableNameOutputId, {
    value: table.tableName,
    exportName: DynamoDbTableNameOutputId,
  });
};
