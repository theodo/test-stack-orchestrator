export const isLocalLambdaInvocation = (): boolean => process.env.IS_LOCAL === 'true';
