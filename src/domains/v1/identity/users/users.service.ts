import { IUsersGetAllDto, IUsersGetDataDto } from './dto/get/model.dto';
import { UsersRepository } from './users.repository';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findById(id: string): Promise<IUsersGetDataDto> {
    try {
      const { data } = await this.usersRepository.findById(id, this.request);
      return IUsersGetAllDto.toIUsersGetDataDto(data);
    } catch (error) {
      throw error;
    }
  }
}
