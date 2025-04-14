import { IHeadersGetDto } from '@/models/headers/model.dto';
import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { lastValueFrom } from 'rxjs';

import { IGroupsRolesGetAllDto, IGroupsGetAllDto } from './dto/get/model.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthConfigsRepository {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async findActiveFarm(where: Prisma.FarmsWhereInput) {
    try {
      return await this.prisma.farms.findFirstOrThrow({ where });
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

  async findUserBy(where: Prisma.PersonsWhereInput) {
    try {
      const response = await this.prisma.persons.findFirstOrThrow({ where });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
