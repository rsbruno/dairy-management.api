import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { IFarmsCreateDto } from './dto/body/model.dto';
import { TenantsService } from '../tenants/tenants.service';
import { FarmsRepository } from './farms.repository';
import { Injectable } from '@nestjs/common';
import { IFarmsGetAllDto, IFarmsGetDataDto } from './dto/get/model.dto';
import { PersonsService } from '../../identity/persons/persons.service';

@Injectable()
export class FarmsService {
  constructor(
    private readonly farmsRepository: FarmsRepository,
    private readonly tenantsService: TenantsService,
    private readonly AuthConfigsService: AuthConfigsService,
    private readonly personsService: PersonsService,
  ) {}

  async findAll(pagination: IOffsetPagination): Promise<IOffsetPaginationResponse<Array<IFarmsGetDataDto>>> {
    try {
      const me = await this.AuthConfigsService.getMe();
      const repositoryResponse = await this.farmsRepository.findAll(pagination, {
        Tenants: {
          members: {
            some: { id: me.id },
          },
        },
      });
      const items = await Promise.all(
        repositoryResponse.items.map(
          async (farm) => await this.findById(farm.id),
        ) as unknown as Array<IFarmsGetDataDto>,
      );
      return { ...repositoryResponse, items } as IOffsetPaginationResponse<Array<IFarmsGetDataDto>>;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const response = await this.farmsRepository.findBy({ id });
      const membersMap = await Promise.all(
        response?.Tenants?.members?.map(async (member) => await this.personsService.findById(member.id)),
      );
      return { ...IFarmsGetAllDto.toIFarmsGetDataDto(response), members: membersMap ?? [] };
    } catch (error) {
      throw error;
    }
  }

  async create(createFarmDto: IFarmsCreateDto) {
    try {
      return this.tenantsService.create(createFarmDto);
    } catch (error) {
      throw error;
    }
  }
}
