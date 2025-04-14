import { IFarmsSelectDTO } from '@/domains/v1/administrative/farms/dto/get/model.dto';
import { UnauthorizedException, Injectable, Inject, Scope } from '@nestjs/common';
import { KeycloakUserService } from '@/keycloak/users/keycloak-user.service';
import { IJWTGetDataDto } from '@/models/headers/model.dto';
import { REQUEST } from '@nestjs/core';

import { IAuthConfigsUserGetDataDto, IRolesGetDataDto, IRolesGetAllDto } from './dto/get/model.dto';
import { AuthConfigsRepository } from './auth-configs.repository';
import { JwtStrategyService } from '../jwt/jwt.service';

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

  public async _loadInfoUserLogged(): Promise<IAuthConfigsUserGetDataDto> {
    try {
      const roles = await this.findRolesByKeycloakId();
      const farm = await this.findActiveFarm();
      const user = { ...(await this.findPersonByKeycloakId()), keycloakId: this.token.payload.sub };
      this.user = {
        roles,
        user,
        farm,
      };
      return this.user;
    } catch (error) {
      throw error;
    }
  }

  public getUser() {
    return this.user;
  }

  private async findActiveFarm(): Promise<IFarmsSelectDTO> {
    try {
      return (await this.authConfigsRepository.findActiveFarm({
        AND: {
          activeMembers: {
            some: {
              keycloakId: this.token.payload.sub,
            },
          },
        },
        clientId: this.token.payload.azp,
      })) as unknown as IFarmsSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  private async findAssignedRolesByGroup(id: string): Promise<Array<IRolesGetDataDto>> {
    try {
      const { data } = await this.authConfigsRepository.findRolesByGroupId(id);
      return data?.realmMappings?.map(role => IRolesGetAllDto.toIRolesDataGetDto(role)) ?? [];
    } catch (error) {
      throw error;
    }
  }

  private async findPersonByKeycloakId(): Promise<any> {
    try {
      return await this.authConfigsRepository.findUserBy({ keycloakId: this.token.payload.sub });
    } catch (error) {
      throw error;
    }
  }

  private async findRolesByKeycloakId() {
    try {
      const { data } = await this.authConfigsRepository.findAssignedGroups(this.token.payload.sub);
      const roles = await Promise.all(data.map(async group => this.findAssignedRolesByGroup(group.id)));
      return roles.flat();
    } catch (error) {
      throw error;
    }
  }
}
