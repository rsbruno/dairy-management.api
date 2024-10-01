import { KeycloakUserRepository } from '@/keycloak/users/keycloak-user.repository';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { PrismaService } from '@/configs/database/prisma.service';
import { IPersonsCreateDto } from './dto/body/model.dto';
import { IPersonsGetAllDto } from './dto/get/model.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PersonsRepository {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
    private readonly keycloakUserRepository: KeycloakUserRepository,
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
      const { farm } = await this.authConfigsService.getMyTenant();
      const farms = [farm, ...(createPersonDto?.farms ?? [])];
      return this.prisma.$transaction(async (prisma) => {
        const { id } = await prisma.persons.create({
          data: {
            keycloakId: 'undefined',
            username: createPersonDto.email,
            tenants: {
              connect:
                farms?.map((farm) => ({
                  farmsId: farm.id,
                })) ?? [],
            },
          },
        });
        const keycloakUser = await this.keycloakUserRepository.create(createPersonDto);
        await prisma.persons.update({
          where: { id },
          data: { keycloakId: keycloakUser?.[0].id },
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
