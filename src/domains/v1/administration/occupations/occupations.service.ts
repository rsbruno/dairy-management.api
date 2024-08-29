import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { OccupationsRepository } from './occupations.repository';
import { Injectable } from '@nestjs/common';
import { IOccupationsGetDataDto } from './dto/get/model.dto';

@Injectable()
export class OccupationsService {
  constructor(private readonly occupationRepository: OccupationsRepository) {}

  async findAll(pagination: IOffsetPagination): Promise<IOffsetPagination<Array<IOccupationsGetDataDto>>> {
    try {
      return (await this.occupationRepository.findAll(pagination)) as unknown as IOffsetPagination<
        Array<IOccupationsGetDataDto>
      >;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IOccupationsGetDataDto> {
    try {
      return await this.occupationRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }
}
