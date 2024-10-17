import { IOffsetPagination, IOffsetPaginationResponse } from '@/models/pagination/offset-pagination/model';
import { ITransactionsTypesGetAllDto, ITransactionsTypesGetDataDto } from './dto/get/model';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { TransactionsTypesRepository } from './transactions-types.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsTypesService {
  constructor(
    private readonly transactionsTypesRepository: TransactionsTypesRepository,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async findById(id: string): Promise<ITransactionsTypesGetDataDto> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const transactionType = await this.transactionsTypesRepository.findBy({
        id,
        AND: {
          farm: {
            id: tenant.farm.id,
          },
        },
      });
      return ITransactionsTypesGetAllDto.toITransactionsTypesGetDataDto(transactionType);
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pagination: IOffsetPagination,
  ): Promise<IOffsetPaginationResponse<Array<ITransactionsTypesGetDataDto>>> {
    try {
      const { tenant } = this.authConfigsService.getUser();
      const transactionsTypes = await this.transactionsTypesRepository.findAll(pagination, tenant.farm.id);
      const items = transactionsTypes.items.map((type) =>
        ITransactionsTypesGetAllDto.toITransactionsTypesGetDataDto(type),
      );
      return { ...transactionsTypes, items } as IOffsetPaginationResponse<
        Array<ITransactionsTypesGetDataDto>
      >;
    } catch (error) {
      throw error;
    }
  }
}
