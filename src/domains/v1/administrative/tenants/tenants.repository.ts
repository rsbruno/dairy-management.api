import { PrismaService } from '@/configs/database/prisma.service';
import { ITenantsCreateDto } from './dto/body/model.dto';
import { ITenantsGetAllDto } from './dto/get/model.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IFarmsCreateDto } from '../farms/dto/body/model.dto';

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

  constructor(private readonly prisma: PrismaService) {}

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
}
