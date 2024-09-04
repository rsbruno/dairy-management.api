import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { IPersonsGetAllDto, IPersonskeycloakFindAllDto, IUsersGetAllDto } from './dto/get/model.dto';
import { PrismaService } from '@/configs/database/prisma.service';
import { IHeadersGetDto } from '@/models/headers/model.dto';
import { IPersonsCreateDto } from './dto/body/model.dto';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Prisma } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { filterByValidParams } from '@/utils/filter-by-valid-params';
import { createUserTemplatePayload } from '@/utils/keycloak-scaffold/create-user-payload';

@Injectable()
export class PersonsRepository {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async findAll(pagination: IOffsetPagination, where?: Prisma.PersonsWhereInput) {
    try {
      const paginateService = new IOffsetPagination<Array<IPersonsGetAllDto>>(this.prisma, pagination);
      const response = await paginateService.paginate('Persons', {
        where: where ?? {},
        select: {
          id: true,
          keycloakId: true,
          tenants: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const response = await this.prisma.persons.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          keycloakId: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.PersonsWhereInput) {
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

  async create(createPersonDto: IPersonsCreateDto) {
    try {
      return this.prisma.$transaction(async (prisma) => {
        const { id } = await prisma.persons.create({
          data: {
            keycloakId: '',
            username: createPersonDto.username,
            tenants: {
              connect: createPersonDto.farm.map((farm) => ({
                farmsId: farm.id,
              })),
            },
          },
        });
        const keycloakUser = await this.createUser(createPersonDto);
        await prisma.persons.update({
          where: { id },
          data: { keycloakId: keycloakUser?.[0].id },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  async keycloakfindById(id: string) {
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

  private async findallUsers(query: IPersonskeycloakFindAllDto) {
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

  private async createUser(createPersonDto: IPersonsCreateDto) {
    try {
      const createUser = createUserTemplatePayload({
        firstName: createPersonDto.firstname,
        lastName: createPersonDto.lastname,
        email: createPersonDto.username,
      });
      await lastValueFrom(
        this.http.post(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
          createUser,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
      const { data } = await this.findallUsers({ search: createPersonDto.username, first: 0, max: 1 });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
