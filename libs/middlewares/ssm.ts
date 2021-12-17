import type { MiddyfiedHandler } from '@middy/core';
import ssmMiddleware from '@middy/ssm';

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

export const useSsmMiddleware = <T, R>(
  middyfiedHandler: MiddyfiedHandler<T, R>,
  ssmParams: Record<string, string>,
): void => {
  middyfiedHandler.use(
    ssmMiddleware({
      setToEnv: true,
      cacheExpiry: ONE_HOUR_IN_MILLISECONDS,
      fetchData: ssmParams,
    }),
  );
};
