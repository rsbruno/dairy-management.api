import { ApiProperty } from '@nestjs/swagger';

import { generateStringSlug } from '../generate-string-slug';
import { generateSecret } from '../generate-random-string';

const unixTimestampInSeconds = () => Math.floor(Date.now() / 1000);

class IFarmsClientAttributes {
  @ApiProperty()
  'backchannel.logout.revoke.offline.tokens': string;

  @ApiProperty()
  'backchannel.logout.session.required': string;

  @ApiProperty()
  'client.secret.creation.time': string;

  @ApiProperty()
  'oauth2.device.authorization.grant.enabled': string;

  @ApiProperty()
  'oidc.ciba.grant.enabled': string;

  @ApiProperty()
  createdBy: string;
}

class IFarmsClientAccess {
  @ApiProperty()
  configure: boolean;

  @ApiProperty()
  manage: boolean;

  @ApiProperty()
  view: boolean;
}

export class IFarmsClientPayloadProps {
  @ApiProperty()
  access: IFarmsClientAccess;

  @ApiProperty()
  adminUrl: string;

  @ApiProperty()
  alwaysDisplayInConsole: boolean;

  @ApiProperty({ type: IFarmsClientAttributes })
  attributes: IFarmsClientAttributes;

  @ApiProperty()
  authenticationFlowBindingOverrides: Record<string, unknown>;

  @ApiProperty()
  baseUrl: string;

  @ApiProperty()
  bearerOnly: boolean;

  @ApiProperty()
  clientAuthenticatorType: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  consentRequired: boolean;

  @ApiProperty()
  defaultClientScopes: string[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  directAccessGrantsEnabled: boolean;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  frontchannelLogout: boolean;

  @ApiProperty()
  fullScopeAllowed: boolean;

  @ApiProperty()
  implicitFlowEnabled: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nodeReRegistrationTimeout: number;

  @ApiProperty()
  notBefore: number;

  @ApiProperty()
  optionalClientScopes: string[];

  @ApiProperty()
  protocol: string;

  @ApiProperty()
  publicClient: boolean;

  @ApiProperty()
  redirectUris: string[];

  @ApiProperty()
  rootUrl: string;

  @ApiProperty()
  secret: string;

  @ApiProperty()
  serviceAccountsEnabled: boolean;

  @ApiProperty()
  standardFlowEnabled: boolean;

  @ApiProperty()
  surrogateAuthRequired: boolean;

  @ApiProperty()
  webOrigins: string[];
}

export const createClientTemplatePayload = ({ name }: { name: string }): IFarmsClientPayloadProps => ({
  attributes: {
    'client.secret.creation.time': unixTimestampInSeconds.toString(),
    'oauth2.device.authorization.grant.enabled': 'false',
    createdBy: `${process.env.KEYCLOAK_REALM}-realm-api`,
    'backchannel.logout.revoke.offline.tokens': 'false',
    'backchannel.logout.session.required': 'true',
    'oidc.ciba.grant.enabled': 'false',
  },
  defaultClientScopes: ['web-origins', 'acr', 'profile', 'roles', 'basic', 'email'],
  optionalClientScopes: ['address', 'phone', 'offline_access', 'microprofile-jwt'],
  access: {
    configure: true,
    manage: true,
    view: true,
  },
  clientAuthenticatorType: 'client-secret',
  authenticationFlowBindingOverrides: {},
  clientId: generateStringSlug(name),
  directAccessGrantsEnabled: true,
  alwaysDisplayInConsole: false,
  serviceAccountsEnabled: false,
  nodeReRegistrationTimeout: -1,
  surrogateAuthRequired: false,
  implicitFlowEnabled: false,
  protocol: 'openid-connect',
  standardFlowEnabled: true,
  secret: generateSecret(),
  frontchannelLogout: true,
  consentRequired: false,
  fullScopeAllowed: true,
  redirectUris: ['/*'],
  publicClient: false,
  webOrigins: ['/*'],
  bearerOnly: false,
  description: '',
  enabled: true,
  adminUrl: '',
  notBefore: 0,
  rootUrl: '',
  baseUrl: '',
  name,
});
