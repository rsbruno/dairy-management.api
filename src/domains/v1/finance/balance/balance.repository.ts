import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { PrismaService } from '@/configs/database/prisma.service';
import { Injectable } from '@nestjs/common';

import { ICostCenterBalanceByCostCenterId, IBalanceDataByTypeDTO } from './dto/params/model.dto';
import { ICostCenterSelectDTO } from '../../parameters/cost-center/dto/get/model';
import { ITransactionSelectDTO } from '../transactions/dto/get/model';

@Injectable()
export class BalanceRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async costCenterBalance(
    costCenters: Map<string, ICostCenterSelectDTO>,
    query: ICostCenterBalanceByCostCenterId,
  ): Promise<Array<ITransactionSelectDTO>> {
    const { farm } = this.authConfigsService.getUser();
    return (await this.prisma.transactions.findMany({
      where: {
        createdAt: {
          gte: query.startDate,
          lte: query.endDate,
        },
        costCenterId: {
          in: Array.from(costCenters.keys()),
        },
        farm: {
          id: farm.id,
        },
      },
      include: { costCenter: true },
    })) as unknown as Array<ITransactionSelectDTO>;
  }

  async getAllNestedCostCenterIds(costCenterId: string): Promise<Map<string, ICostCenterSelectDTO>> {
    const result = await this.prisma.$queryRaw<Array<ICostCenterSelectDTO>>`
      WITH RECURSIVE cost_center_ids AS (
        SELECT * FROM cost_center WHERE id = ${costCenterId}
        UNION ALL
        SELECT cc.*
        FROM cost_center cc
        INNER JOIN cost_center_ids ai ON cc."parentId" = ai.id
      )
      SELECT * FROM cost_center_ids;
    `;
    const costCenterMap = new Map<string, ICostCenterSelectDTO>();
    result.forEach(cc => {
      costCenterMap.set(cc.id, cc);
    });
    return costCenterMap;
  }

  async transactionsByType(query: IBalanceDataByTypeDTO): Promise<Array<ITransactionSelectDTO>> {
    const { farm } = this.authConfigsService.getUser();
    return (await this.prisma.transactions.findMany({
      where: {
        createdAt: {
          gte: query.startDate,
          lte: query.endDate,
        },
        type: {
          code: {
            in: query.code,
          },
        },
        farm: {
          id: farm.id,
        },
      },
      include: { costCenter: true },
    })) as unknown as Array<ITransactionSelectDTO>;
  }
}
