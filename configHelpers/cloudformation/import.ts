type CfnImportValue = {
  'Fn::ImportValue': string;
};
export const importCfnOutput = (outputName: string): CfnImportValue => ({
  'Fn::ImportValue': outputName,
});
