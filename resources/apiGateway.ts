import { getAttribute, ref } from '../configHelpers';
import { ApiCertificate, ApiHostedZone, domainNameName } from './hostedZone';

export const DomainName = {
  Type: 'AWS::ApiGatewayV2::DomainName',
  Properties: {
    DomainName: domainNameName,
    DomainNameConfigurations: [
      {
        EndpointType: 'REGIONAL',
        CertificateName: 'ApiCertificate',
        CertificateArn: ref({ ApiCertificate }),
      },
    ],
  },
};

export const ApiMapping = {
  Type: 'AWS::ApiGatewayV2::ApiMapping',
  Properties: {
    ApiId: { Ref: 'HttpApi' },
    DomainName: ref({ DomainName }),
    Stage: '$default',
  },
};

export const ApiAliasRecord = {
  Type: 'AWS::Route53::RecordSet',
  Properties: {
    AliasTarget: {
      DNSName: getAttribute({ DomainName }, 'RegionalDomainName'),
      EvaluateTargetHealth: true,
      HostedZoneId: getAttribute({ DomainName }, 'RegionalHostedZoneId'),
    },
    HostedZoneId: ref({ ApiHostedZone }),
    Name: domainNameName,
    Type: 'A',
  },
};
