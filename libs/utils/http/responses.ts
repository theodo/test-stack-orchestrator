import type { APIGatewayProxyResult } from 'aws-lambda';

import { StatusCodes } from './status';

type Result<T extends Record<string, unknown>> = Omit<APIGatewayProxyResult, 'body'> & {
  body: T;
};

export const success = <T extends Record<string, unknown>>(
  body: T,
  headers?: APIGatewayProxyResult['headers'],
): Result<T> => ({
  statusCode: StatusCodes.OK,
  body,
  headers: { 'content-type': 'application/json', ...headers },
});

export const created = <T extends Record<string, unknown>>(
  body: T,
  headers?: APIGatewayProxyResult['headers'],
): Result<T> => ({
  statusCode: StatusCodes.CREATED,
  body,
  headers,
});
