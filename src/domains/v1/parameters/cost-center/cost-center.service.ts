import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { CostCenterRepository } from './cost-center.repository';
import { ICostCenterCreateDTO } from './dto/body/model.dto';
import { ICostCenterDataDTO } from './dto/get/model';

@Injectable()
export class CostCenterService {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async create(costCenterCreateDto: ICostCenterCreateDTO): Promise<ICostCenterDataDTO> {
    try {
      const costCenter = await this.costCenterRepository.create(costCenterCreateDto);
      return ICostCenterDataDTO.toICostCenterDataDTO(costCenter);
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: IOffsetPagination) {
    try {
      const costCenters = await this.costCenterRepository.findAll(pagination);
      return {
        ...costCenters,
        items: costCenters.items.map(costCenter => ICostCenterDataDTO.toICostCenterDataDTO(costCenter)),
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ICostCenterDataDTO> {
    try {
      const costCenter = await this.costCenterRepository.findBy({ id });
      return ICostCenterDataDTO.toICostCenterDataDTO(costCenter);
    } catch (error) {
      throw error;
    }
  }
}
