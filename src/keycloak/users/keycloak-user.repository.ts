import {
  IPersonsGroupsGetAllDto,
  IPersonskeycloakFindAllDto,
  IPersonsRolesGetAllDto,
  IUsersGetAllDto,
} from '@/domains/v1/identity/persons/dto/get/model.dto';
import { createUserTemplatePayload } from '@/utils/keycloak-scaffold/create-user-payload';
import { IPersonsCreateDto } from '@/domains/v1/identity/persons/dto/body/model.dto';
import { filterByValidParams } from '@/utils/filter-by-valid-params';
import { IHeadersGetDto } from '@/models/headers/model.dto';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { REQUEST } from '@nestjs/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KeycloakUserRepository {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly http: HttpService,
  ) {}

  async findById(id: string) {
    try {
      return await lastValueFrom(
        this.http.get<IUsersGetAllDto>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: IPersonskeycloakFindAllDto) {
    try {
      return await lastValueFrom(
        this.http.get<Array<IUsersGetAllDto>>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
          {
            ...new IHeadersGetDto(this.request).getConfigs(),
            params: filterByValidParams<IPersonskeycloakFindAllDto>(query),
          },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAssignedGroups(userId: string) {
    try {
      return await lastValueFrom(
        this.http.get<Array<IPersonsGroupsGetAllDto>>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}/groups`,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAssignedRolesByGroup(id: string) {
    try {
      return await lastValueFrom(
        this.http.get<IPersonsRolesGetAllDto>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/groups/${id}/role-mappings`,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async create(createPersonDto: IPersonsCreateDto) {
    try {
      const createUser = createUserTemplatePayload({
        firstName: createPersonDto.firstname,
        lastName: createPersonDto.lastname,
        email: createPersonDto.email,
      });
      await lastValueFrom(
        this.http.post(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
          createUser,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
      const { data } = await this.findAll({ search: createPersonDto.email, first: 0, max: 1 });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
