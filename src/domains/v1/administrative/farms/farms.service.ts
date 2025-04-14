import { IOffsetPagination } from '@/models/pagination/offset-pagination/model';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../../identity/auth/auth.service';
import { FarmsRepository } from './farms.repository';
import { IFarmsDataDTO } from './dto/get/model.dto';

@Injectable()
export class FarmsService {
  constructor(
    private readonly farmsRepository: FarmsRepository,
    private readonly authService: AuthService,
  ) {}

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

  async switch(farmId: string, refreshToken: string) {
    try {
      const token = await this.authService.refreshKeycloakToken(refreshToken);
      await this.farmsRepository.switch(farmId);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
