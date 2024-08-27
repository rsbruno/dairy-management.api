import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { PrismaService } from '@/configs/database/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

type PrismaMethods = {
  [K in keyof PrismaClient]: PrismaClient[K] extends {
    findMany: (args?: any) => Promise<any>;
  }
    ? Parameters<PrismaClient[K]['findMany']>[0]
    : never;
};

export class IOffsetPaginationResponse<T = any[]> {
  @ApiProperty({
    type: [Object],
    isArray: true,
  })
  items: T;

  @ApiProperty()
  total: number;

  constructor([items, total]: any) {
    this.items = items ?? [];
    this.total = total ?? 0;
  }

  async JsonResponse() {
    return {
      items: this.items,
      total: this.total,
    };
  }
}

export class IOffsetPagination<R = Array<{}>> {
  constructor(
    private prisma: PrismaService,
    private pagination: IOffsetPagination,
  ) {}

  @ApiProperty({
    required: false,
    default: 10,
  })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: commonExceptions.param.isNumber })
  @Min(1, { message: commonExceptions.param.isMinValue['1'] })
  max?: number = 10;

  @ApiProperty({
    required: false,
    default: 1,
  })
  @Transform(({ value }) => Number(value))
  @IsInt({ message: commonExceptions.param.isNumber })
  @Min(1, { message: commonExceptions.param.isMinValue['1'] })
  page?: number = 1;

  async paginate<T extends keyof PrismaClient>(model: Prisma.ModelName, options?: PrismaMethods[T]) {
    const offsetSalt = (this.pagination.page! - 1) * this.pagination.max;
    const args = {
      take: Number(this.pagination.max),
      skip: offsetSalt,
      orderBy: {
        id: 'asc',
      },
      ...options,
    } as PrismaMethods[T];
    const response = await this.prisma.$transaction([
      this.prisma?.[model?.toLowerCase()]?.findMany(args as PrismaMethods[T]),
      this.prisma?.[model?.toLowerCase()]?.count({
        where: args.where ?? {},
        orderBy: args.orderBy,
        take: args.take,
        skip: args.skip,
      }),
    ]);
    return new IOffsetPaginationResponse<R>(response).JsonResponse();
  }
}
