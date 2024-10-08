/* import { IUsersGetAllDto } from '@/domains/v1/identity/persons/dto/get/model.dto'; */

/* export class IHoIAm extends IUsersGetAllDto {
  roles: Array<string>;
}
 */
export class IJWTGetDataDto {
  payload: {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: Array<string>;
    sub: string;
    typ: string;
    azp: string;
    sid: string;
    acr: string;
    resource_access: { 'realm-management': { roles: Array<string> }; account: { roles: Array<string> } };
    scope: string;
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
  };
}

export class IHeadersGetDto {
  request: Request;
  constructor(request: Request) {
    this.request = request;
  }

  public getConfigs() {
    return {
      headers: {
        Authorization: this.request.headers['authorization'],
      },
    };
  }
}
