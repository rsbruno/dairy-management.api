import { TenantsRepository } from '@/domains/v1/administrative/tenants/tenants.repository';
import { IPersonsRolesGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { KeycloakUserService } from '@/keycloak/users/keycloak-user.service';
import { IJWTGetDataDto } from '@/models/headers/model.dto';
import { JwtStrategyService } from '../jwt/jwt.service';
import { REQUEST } from '@nestjs/core';

class ITenants {
  clientSecret: string;
  clientId: string;
  id: string;
  farm: {
    name: string;
    cnpj: string;
    id: string;
  };
  members: Array<{
    id: string;
    keycloakId: string;
  }>;
}

class IMe {
  createdTimestamp: number;
  firstName: string;
  lastName: string;
  username: string;
  enabled: boolean;
  email: string;
  id: string;
  keycloakId: string;
  roles: Array<IPersonsRolesGetDataDto>;
}
@Injectable({ scope: Scope.REQUEST })
export class AuthConfigsService {
  private tokenDecoded = {} as IJWTGetDataDto;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly jwtStrategyService: JwtStrategyService,
    private readonly tenantsService: TenantsRepository,
    private readonly keycloakUserService: KeycloakUserService,
  ) {
    const token = this.request.headers['authorization']?.split(' ')?.[1];
    if (!token) throw new UnauthorizedException();
    this.tokenDecoded = this.jwtStrategyService.decodeToken(token);
  }

  public async getMe(): Promise<IMe> {
    const keycloakId = this.tokenDecoded.payload.sub;
    const roles = await this.keycloakUserService.findAssignedRoles(keycloakId);
    return { keycloakId, roles } as IMe;
  }

  public async getMyTenant(): Promise<ITenants> {
    try {
      const tenant = await this.tenantsService.findBy({ clientId: this.tokenDecoded.payload.azp });
      return tenant as ITenants;
    } catch (error) {
      throw error;
    }
  }
}
