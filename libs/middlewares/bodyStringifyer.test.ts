import { bodyStringifyer } from './bodyStringifyer';

const responseWithBody = {
  body: {
    key: 'value',
  },
};
const responseWithoutBody = {
  otherKey: {
    key: 'value',
  },
};
const responseWithStringBody = {
  body: 'value',
};

describe('bodyStringifyer', () => {
  it('should stringify response body', () => {
    const response = responseWithBody;
    const after = bodyStringifyer().after;
    after?.(
      // @ts-expect-error we only need the response object
      {
        response,
      },
    );
    expect(response).toEqual({ body: '{"key":"value"}' });
  });
  it('should return the same response object if it has no body property', () => {
    const response = responseWithoutBody;
    const after = bodyStringifyer().after;
    after?.(
      // @ts-expect-error we only need the response object
      {
        response,
      },
    );
    expect(response).toEqual(responseWithoutBody);
  });
  it('should return the same response object if it has a string body property', () => {
    const response = responseWithStringBody;
    const after = bodyStringifyer().after;
    after?.(
      // @ts-expect-error we only need the response object
      {
        response,
      },
    );
    expect(response).toEqual(responseWithStringBody);
  });
});
