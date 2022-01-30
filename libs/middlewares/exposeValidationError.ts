import type { MiddlewareObj } from '@middy/core';

type MiddyValidationError = {
  status: 400;
  message: 'Event object failed validation';
  details: string;
};

type UnknownMiddyValidationError = Partial<MiddyValidationError> | undefined | null;

const isMiddyValidationError = (error: unknown): error is MiddyValidationError =>
  (error as UnknownMiddyValidationError)?.status === 400 &&
  (error as UnknownMiddyValidationError)?.message === 'Event object failed validation';

export const exposeValidationError = <T, R>(): MiddlewareObj<T, R> => ({
  onError: ({ error }) => {
    console.log('Error :');
    console.log(JSON.stringify(error, null, 2));
    if (isMiddyValidationError(error)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message, details: error.details }, null, 2),
        headers: { 'content-type': 'application/json' },
      };
    }

    return error;
  },
});
