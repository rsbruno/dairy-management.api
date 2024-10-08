import { ITenantsGetAllDto } from '@/domains/v1/administrative/tenants/dto/get/model.dto';
import { PrismaService } from '../database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { IAuthConfigsTenantsGetAllDto, IGroupsGetAllDto, IGroupsRolesGetAllDto } from './dto/get/model.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { IHeadersGetDto } from '@/models/headers/model.dto';

@Injectable()
export class AuthConfigsRepository {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async findUserBy(where: Prisma.PersonsWhereInput) {
    try {
      const response = await this.prisma.persons.findFirstOrThrow({
        where,
        select: {
          keycloakId: true,
          id: true,
          username: true,
          tenants: {
            select: {
              farm: true,
              members: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findTenantsBy(where: Prisma.TenantsWhereInput): Promise<IAuthConfigsTenantsGetAllDto> {
    try {
      const response = await this.prisma.tenants.findFirstOrThrow({
        select: {
          clientSecret: true,
          clientId: true,
          id: true,
          farm: {
            select: {
              name: true,
              cnpj: true,
              id: true,
            },
          },
          members: {
            select: {
              keycloakId: true,
              username: true,
              id: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
        where,
      });
      return response as unknown as IAuthConfigsTenantsGetAllDto;
    } catch (error) {
      throw error;
    }
  }

  async findAssignedGroups(id: string) {
    try {
      return await lastValueFrom(
        this.http.get<Array<IGroupsGetAllDto>>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}/groups`,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findRolesByGroupId(groupId: string) {
    try {
      return await lastValueFrom(
        this.http.get<IGroupsRolesGetAllDto>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/groups/${groupId}/role-mappings`,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
