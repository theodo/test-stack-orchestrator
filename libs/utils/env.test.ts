import { Env, getEnv } from './env';

const value = 'MyValue';

describe('getEnv', () => {
  it('gets the environment variable value', () => {
    process.env[Env.TableName] = value;
    expect(getEnv(Env.TableName)).toEqual(value);
  });

  it('throws if the environment variable is not set', () => {
    delete process.env[Env.TableName];
    expect(() => getEnv(Env.TableName)).toThrow();
  });
});
