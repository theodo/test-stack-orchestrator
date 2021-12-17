import type { HttpError } from 'http-errors';
import createError from 'http-errors';

export { createError as createHttpError };

// By default error with status code >= 500 are not exposed to the client.
// A default InternalServerError is exposed to the client instead
// This function enables to bypass this rule to expose the error to the client
export const exposed = (httpError: HttpError): HttpError => {
  httpError.expose = true;

  return httpError;
};
