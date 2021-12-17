import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Table } from 'dynamodb-toolbox';

import { Env, getEnv } from '@libs/utils';
import { PARTITION_KEY, SORT_KEY } from '@resources/dynamodb';

const documentClient = new DocumentClient({
  convertEmptyValues: false,
});

export const LockTable = new Table({
  name: getEnv(Env.TableName),
  partitionKey: PARTITION_KEY,
  sortKey: SORT_KEY,
  DocumentClient: documentClient,
});
