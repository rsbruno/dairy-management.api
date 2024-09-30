import { PrismaService } from '@/configs/database/prisma.service';
import { ITenantsCreateDto } from './dto/body/model.dto';
import { ITenantsGetAllDto } from './dto/get/model.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IFarmsCreateDto } from '../farms/dto/body/model.dto';
import { lastValueFrom } from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { IHeadersGetDto } from '@/models/headers/model.dto';
import { IFarmsClientPayloadProps } from '@/utils/keycloak-scaffold/create-client-palyload';

@Injectable()
export class TenantsRepository {
  private selectProps = {
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
        id: true,
        keycloakId: true,
      },
    },
  };

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async findAll(): Promise<ITenantsGetAllDto> {
    try {
      const response = await this.prisma.tenants.findMany({
        select: {
          clientId: true,
          members: {
            select: {
              username: true,
            },
          },
        },
      });
      return response as unknown as ITenantsGetAllDto;
    } catch (error) {
      throw error;
    }
  }

  async findBy(where: Prisma.TenantsWhereInput): Promise<ITenantsGetAllDto> {
    try {
      const response = await this.prisma.tenants.findFirstOrThrow({
        select: this.selectProps,
        where,
      });
      return response as unknown as ITenantsGetAllDto;
    } catch (error) {
      throw error;
    }
  }

  async create(createTenantDto: IFarmsCreateDto) {
    try {
      const response = await this.prisma.tenants.create({
        data: {
          clientId: createTenantDto.clientId,
          clientSecret: createTenantDto.clientSecret,
          farm: {
            create: {
              cnpj: createTenantDto.cnpj,
              name: createTenantDto.name,
            },
          },
          members: {
            connect: createTenantDto.members.map((member) => ({ id: member.personId })),
          },
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async keycloakCreateClient(client: IFarmsClientPayloadProps) {
    try {
      return await lastValueFrom(
        this.http.post(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/clients`,
          client,
          new IHeadersGetDto(this.request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
