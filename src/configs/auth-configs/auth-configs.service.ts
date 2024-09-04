import { IUsersGetAllDto, IPersonsGetDataDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { ITenantsGetAllDto } from '@/domains/v1/administrative/tenants/dto/get/model.dto';
import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { IJWTGetDataDto } from '@/models/headers/model.dto';
import { JwtStrategyService } from '../jwt/jwt.service';
import { REQUEST } from '@nestjs/core';
import { PersonsService } from '@/domains/v1/identity/persons/persons.service';
import { TenantsRepository } from '@/domains/v1/administrative/tenants/tenants.repository';
import { TenantsService } from '@/domains/v1/administrative/tenants/tenants.service';

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
}
@Injectable({ scope: Scope.REQUEST })
export class AuthConfigsService {
  private tokenDecoded = {} as IJWTGetDataDto;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly jwtStrategyService: JwtStrategyService,
    /*  private readonly personsService: PersonsService, */
    private readonly tenantsService: TenantsRepository,
  ) {
    const token = this.request.headers['authorization']?.split(' ')?.[1];
    if (!token) throw new UnauthorizedException();
    this.tokenDecoded = this.jwtStrategyService.decodeToken(token);
  }

  public async getMe(): Promise<IMe> {
    /*  const person = await this.personsService.findByKeycloakId(this.tokenDecoded.payload.sub); */
    /* return { ...person, keycloakId: this.tokenDecoded.payload.sub } as IMe; */
    return { keycloakId: this.tokenDecoded.payload.sub } as IMe;
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
