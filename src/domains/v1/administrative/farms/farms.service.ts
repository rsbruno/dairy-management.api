import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { FarmsRepository } from './farms.repository';
import { IFarmsDataDTO } from './dto/get/model.dto';

@Injectable()
export class FarmsService {
  constructor(private readonly farmsRepository: FarmsRepository) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const farms = await this.farmsRepository.findAll(pagination);
      return {
        ...farms,
        items: farms.items.map(farm => IFarmsDataDTO.transform(farm)),
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const farm = await this.farmsRepository.findBy({ id });
      return IFarmsDataDTO.transform(farm);
    } catch (error) {
      throw error;
    }
  }
}
