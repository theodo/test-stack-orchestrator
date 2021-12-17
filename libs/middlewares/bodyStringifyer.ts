import type { MiddlewareObj } from '@middy/core';

export const bodyStringifyer = <
  T,
  R extends { body?: string | Record<string, unknown>; [key: string]: unknown },
>(): MiddlewareObj<T, R> => ({
  after: ({ response }) => {
    if (response?.body !== undefined) {
      response.body = JSON.stringify(response.body);
    }
  },
});
