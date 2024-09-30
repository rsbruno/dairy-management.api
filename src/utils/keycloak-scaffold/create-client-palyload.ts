import { generateSecret } from '../generate-random-string';
import { ApiProperty } from '@nestjs/swagger';
import { generateStringSlug } from '../generate-string-slug';

const unixTimestampInSeconds = () => Math.floor(Date.now() / 1000);

class IFarmsClientAttributes {
  @ApiProperty()
  'oidc.ciba.grant.enabled': string;

  @ApiProperty()
  'client.secret.creation.time': string;

  @ApiProperty()
  'backchannel.logout.session.required': string;

  @ApiProperty()
  'oauth2.device.authorization.grant.enabled': string;

  @ApiProperty()
  'backchannel.logout.revoke.offline.tokens': string;

  @ApiProperty()
  createdBy: string;
}

class IFarmsClientAccess {
  @ApiProperty()
  view: boolean;

  @ApiProperty()
  configure: boolean;

  @ApiProperty()
  manage: boolean;
}

export class IFarmsClientPayloadProps {
  @ApiProperty()
  name: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  secret: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rootUrl: string;

  @ApiProperty()
  adminUrl: string;

  @ApiProperty()
  baseUrl: string;

  @ApiProperty()
  surrogateAuthRequired: boolean;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  alwaysDisplayInConsole: boolean;

  @ApiProperty()
  clientAuthenticatorType: string;

  @ApiProperty()
  redirectUris: string[];

  @ApiProperty()
  webOrigins: string[];

  @ApiProperty()
  notBefore: number;

  @ApiProperty()
  bearerOnly: boolean;

  @ApiProperty()
  consentRequired: boolean;

  @ApiProperty()
  standardFlowEnabled: boolean;

  @ApiProperty()
  implicitFlowEnabled: boolean;

  @ApiProperty()
  directAccessGrantsEnabled: boolean;

  @ApiProperty()
  serviceAccountsEnabled: boolean;

  @ApiProperty()
  publicClient: boolean;

  @ApiProperty()
  frontchannelLogout: boolean;

  @ApiProperty()
  protocol: string;

  @ApiProperty({ type: IFarmsClientAttributes })
  attributes: IFarmsClientAttributes;

  @ApiProperty()
  authenticationFlowBindingOverrides: Record<string, unknown>;

  @ApiProperty()
  fullScopeAllowed: boolean;

  @ApiProperty()
  nodeReRegistrationTimeout: number;

  @ApiProperty()
  defaultClientScopes: string[];

  @ApiProperty()
  optionalClientScopes: string[];

  @ApiProperty()
  access: IFarmsClientAccess;
}

export const createClientTemplatePayload = ({ name }: { name: string }): IFarmsClientPayloadProps => ({
  clientId: generateStringSlug(name),
  name,
  secret: generateSecret(),
  description: '',
  rootUrl: '',
  adminUrl: '',
  baseUrl: '',
  surrogateAuthRequired: false,
  enabled: true,
  alwaysDisplayInConsole: false,
  clientAuthenticatorType: 'client-secret',
  redirectUris: ['/*'],
  webOrigins: ['/*'],
  notBefore: 0,
  bearerOnly: false,
  consentRequired: false,
  standardFlowEnabled: true,
  implicitFlowEnabled: false,
  directAccessGrantsEnabled: true,
  serviceAccountsEnabled: false,
  publicClient: false,
  frontchannelLogout: true,
  protocol: 'openid-connect',
  attributes: {
    'oidc.ciba.grant.enabled': 'false',
    'client.secret.creation.time': unixTimestampInSeconds.toString(),
    'backchannel.logout.session.required': 'true',
    'oauth2.device.authorization.grant.enabled': 'false',
    'backchannel.logout.revoke.offline.tokens': 'false',
    createdBy: `${process.env.KEYCLOAK_REALM}-realm-api`,
  },
  authenticationFlowBindingOverrides: {},
  fullScopeAllowed: true,
  nodeReRegistrationTimeout: -1,
  defaultClientScopes: ['web-origins', 'acr', 'profile', 'roles', 'basic', 'email'],
  optionalClientScopes: ['address', 'phone', 'offline_access', 'microprofile-jwt'],
  access: {
    view: true,
    configure: true,
    manage: true,
  },
});
