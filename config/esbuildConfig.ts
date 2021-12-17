export const esbuildConfig = {
  packager: 'yarn',
  bundle: true,
  minify: false,
  sourcemap: true,
  exclude: ['aws-sdk'],
  target: 'node14',
  platform: 'node',
  mainFields: ['module', 'main'],
};
