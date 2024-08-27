import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '@/domains/v1/identity/users/users.repository';
import { IHoIAm, IJWTGetDataDto } from '@/models/headers/model.dto';
import { JwtStrategyService } from '../jwt/jwt.service';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthConfigsService {
  me: IHoIAm = {} as IHoIAm;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async hoIAm() {
    try {
      /*   const token = this.request.headers['authorization']?.split(' ')?.[1];
      if (!token) throw new UnauthorizedException();
      const tokenDecoded = this.jwtStrategyService.decodeToken(token);
      const { data: groups } = await this.usersRepository.findAssignedGroups(
        tokenDecoded.payload.sub,
        this.request,
      );
      const data = await Promise.all(
        groups.map(
          async (group) =>
            (await this.groupsRepository.findAssignedRolesByGroup(group.id, this.request)).data,
        ),
      );
      const roles = data.map(({ realmMappings }) =>
        realmMappings?.map((role) => IRolesGetAllDto.toIRolesDataGetDto(role)),
      );
      const { data: userInfo } = await this.usersRepository.findById(tokenDecoded.payload.sub, this.request);
      this.me = {
        ...userInfo,
        roles: [roles.flat().map(({ name }) => name), this.getRolesFromParsedJwt(tokenDecoded)].flat(),
      };
      return this.me; */
    } catch (error) {
      throw error;
    }
  }

  private getRolesFromParsedJwt(jwtPayload: IJWTGetDataDto): string[] {
    const roles: string[] = [];
    if (jwtPayload.payload.resource_access) {
      for (const key in jwtPayload.payload.resource_access) {
        if (jwtPayload.payload.resource_access[key].roles) {
          roles.push(...jwtPayload.payload.resource_access[key].roles);
        }
      }
    }
    return roles;
  }
}
