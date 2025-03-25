import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { MeasurementUnitsRepository } from './measurement-units.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeasurementUnitsService {
  constructor(
    private readonly measurementUnitsRepository: MeasurementUnitsRepository,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      const { tenant } = this.authConfigsService.getUser();
      return await this.measurementUnitsRepository.findAll(pagination, tenant.farm.id);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.measurementUnitsRepository.findBy({ id });
    } catch (error) {
      throw error;
    }
  }
}
