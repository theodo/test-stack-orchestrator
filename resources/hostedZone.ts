import { ref } from '../configHelpers';

export const domainNameName = 'stack-orchestrator.theodo.org';

export const ApiHostedZone = {
  Type: 'AWS::Route53::HostedZone',
  Properties: {
    HostedZoneConfig: {
      Comment: 'Hosted zone for api gateway',
    },
    Name: domainNameName,
  },
};

export const ApiCertificate = {
  Type: 'AWS::CertificateManager::Certificate',
  Properties: {
    DomainName: domainNameName,
    DomainValidationOptions: [
      {
        DomainName: domainNameName,
        HostedZoneId: ref({ ApiHostedZone }),
      },
    ],
    ValidationMethod: 'DNS',
  },
};
