import type { MiddyfiedHandler } from '@middy/core';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import jsonValidator from '@middy/validator';
import type { Handler } from 'aws-lambda';

import { bodyStringifyer } from './bodyStringifyer';
import { mockLogger } from './mockLogger';
import { useSsmMiddleware } from './ssm';

type ApplyMiddlewaresOptions = {
  inputSchema?: unknown;
  outputSchema?: unknown;
  ssmParams?: Record<string, string>;
  logEvent?: boolean;
};

export const applyHttpMiddleware = <T, R extends Record<string, unknown>>(
  handler: Handler<T, R>,
  { inputSchema, outputSchema, ssmParams, logEvent }: ApplyMiddlewaresOptions = {},
): MiddyfiedHandler<T, R> => {
  const middyfiedHandler = middy(handler);

  if (logEvent === true) {
    middyfiedHandler.use(mockLogger());
  }

  if (inputSchema !== undefined) {
    middyfiedHandler.use(jsonBodyParser());
  }

  middyfiedHandler.use(bodyStringifyer());

  if (inputSchema !== undefined || outputSchema !== undefined) {
    middyfiedHandler.use(jsonValidator({ inputSchema, outputSchema }));
  }

  if (ssmParams) {
    useSsmMiddleware(middyfiedHandler, ssmParams);
  }

  middyfiedHandler.use(httpErrorHandler());

  return middyfiedHandler;
};
