import { throwIfNil } from '@libs/utils';

import type { CloudFormationTemplate } from './types';

type MayBeOutput =
  | {
      Value?: string;
    }
  | undefined;

export const getOutputValue = (template: CloudFormationTemplate, outputId: string): string => {
  const outputValue = (template.Outputs?.[outputId] as MayBeOutput)?.Value;
  throwIfNil(outputValue, `${outputId} is not an Output of the template`);

  return outputValue;
};
