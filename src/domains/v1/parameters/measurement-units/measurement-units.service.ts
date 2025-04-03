import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { MeasurementUnitsRepository } from './measurement-units.repository';

@Injectable()
export class MeasurementUnitsService {
  constructor(private readonly measurementUnitsRepository: MeasurementUnitsRepository) {}

  async findAll(pagination: IOffsetPagination) {
    try {
      return await this.measurementUnitsRepository.findAll(pagination);
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
