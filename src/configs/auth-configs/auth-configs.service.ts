import { IPersonsGetDataDto, IUsersGetAllDto } from '@/domains/v1/identity/persons/dto/get/model.dto';
import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { KeycloakUserService } from '@/keycloak/users/keycloak-user.service';
import { AuthConfigsRepository } from './auth-configs.repository';
import { IAuthConfigsUserGetDataDto, IRolesGetAllDto, IRolesGetDataDto } from './dto/get/model.dto';
import { IJWTGetDataDto } from '@/models/headers/model.dto';
import { JwtStrategyService } from '../jwt/jwt.service';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthConfigsService {
  private token: IJWTGetDataDto;
  private user: IAuthConfigsUserGetDataDto;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly jwtStrategyService: JwtStrategyService,
    private readonly authConfigsRepository: AuthConfigsRepository,
    private readonly keycloakUserService: KeycloakUserService,
  ) {
    const tokenParsed = this.request.headers['authorization']?.split(' ')?.[1];
    if (!tokenParsed) throw new UnauthorizedException();
    this.token = this.jwtStrategyService.decodeToken(tokenParsed);
  }

  private async findUserByKeycloakId(): Promise<IPersonsGetDataDto> {
    try {
      const person = await this.authConfigsRepository.findUserBy({ keycloakId: this.token.payload.sub });
      const user = await this.keycloakUserService.findById(person.keycloakId);
      return { ...IUsersGetAllDto.toIPersonsGetDataDto(user), id: person.id } as IPersonsGetDataDto;
    } catch (error) {
      throw error;
    }
  }

  private async findTenantsByClientId() {
    try {
      return await this.authConfigsRepository.findTenantsBy({
        clientId: this.token.payload.azp,
        AND: {
          members: {
            some: {
              keycloakId: this.token.payload.sub,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private async findAssignedRolesByGroup(id: string): Promise<Array<IRolesGetDataDto>> {
    try {
      const { data } = await this.authConfigsRepository.findRolesByGroupId(id);
      return data?.realmMappings?.map((role) => IRolesGetAllDto.toIRolesDataGetDto(role)) ?? [];
    } catch (error) {
      throw error;
    }
  }

  private async findRolesByKeycloakId() {
    try {
      const { data } = await this.authConfigsRepository.findAssignedGroups(this.token.payload.sub);
      const roles = await Promise.all(data.map(async (group) => this.findAssignedRolesByGroup(group.id)));
      return roles.flat();
    } catch (error) {
      throw error;
    }
  }

  public async _loadInfoUserLogged(): Promise<IAuthConfigsUserGetDataDto> {
    try {
      const roles = await this.findRolesByKeycloakId();
      const tenant = await this.findTenantsByClientId();
      const info = { ...(await this.findUserByKeycloakId()), keycloakId: this.token.payload.sub };
      this.user = {
        tenant,
        roles,
        info,
      };
      return this.user;
    } catch (error) {
      throw error;
    }
  }

  public getUser() {
    return this.user;
  }
}
