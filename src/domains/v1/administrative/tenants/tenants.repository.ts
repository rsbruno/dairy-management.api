import { PrismaService } from '@/configs/database/prisma.service';
import { ITenantsGetAllDto } from './dto/get/model.dto';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Prisma } from '@prisma/client';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TenantsRepository {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

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

  async findBy(where: Prisma.TenantsWhereInput): Promise<ITenantsGetAllDto> {
    try {
      const response = await this.prisma.tenants.findFirstOrThrow({
        select: this.selectProps,
        orderBy: {
          id: 'desc',
        },
        where,
      });
      return response as unknown as ITenantsGetAllDto;
    } catch (error) {
      throw error;
    }
  }

  async create() {
    try {
    } catch (error) {
      throw error;
    }
  }
}
