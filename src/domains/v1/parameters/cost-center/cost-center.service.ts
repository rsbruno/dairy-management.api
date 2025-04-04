import { Injectable } from '@nestjs/common';

import { CostCenterRepository } from './cost-center.repository';
import { ICostCenterCreateDTO } from './dto/body/model.dto';
import { ICostCenterFindAll } from './dto/param/model.dto';
import { ICostCenterDataDTO } from './dto/get/model';

@Injectable()
export class CostCenterService {
  constructor(private readonly costCenterRepository: CostCenterRepository) {}

  async create(costCenterCreateDto: ICostCenterCreateDTO): Promise<ICostCenterDataDTO> {
    try {
      const costCenter = await this.costCenterRepository.create(costCenterCreateDto);
      return ICostCenterDataDTO.toICostCenterDataDTO(costCenter);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: ICostCenterFindAll) {
    try {
      const costCenters = await this.costCenterRepository.findAll(query);
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
