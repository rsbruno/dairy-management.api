import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { CostCenterRepository } from './cost-center.repository';
import { ICostCenterCreateDto } from './dto/body/model.dto';
import { ICostCenterGetAllDto } from './dto/get/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CostCenterService {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findById(id: string) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const costCenter = await this.costCenterRepository.findBy({
        id,
        AND: {
          farm: {
            id: tenant.farm.id,
          },
        },
      });
      return ICostCenterGetAllDto.toICostCenterGetDataDto(costCenter);
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const costCenters = await this.costCenterRepository.findAll(pagination, tenant.farm.id);
      const items = costCenters.items.map((costCenter) =>
        ICostCenterGetAllDto.toICostCenterGetDataDto(costCenter),
      );
      return { ...costCenters, items };
    } catch (error) {
      throw error;
    }
  }

  async create(costCenterCreateDto: ICostCenterCreateDto) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      return await this.costCenterRepository.create(costCenterCreateDto, tenant.farm.id);
    } catch (error) {
      throw error;
    }
  }
}
