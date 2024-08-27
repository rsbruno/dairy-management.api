import { IUsersGetAllDto, IUsersGetDataDto } from './dto/get/model.dto';
import { IUsersFindAllDto } from './dto/param/model.dto';
import { UsersRepository } from './users.repository';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findall(query: IUsersFindAllDto): Promise<Array<IUsersGetDataDto>> {
    try {
      const { data } = await this.usersRepository.findall(query, this.request);
      return data.map((user) => IUsersGetAllDto.toIUsersGetDataDto(user));
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IUsersGetDataDto> {
    try {
      const { data } = await this.usersRepository.findById(id, this.request);
      return IUsersGetAllDto.toIUsersGetDataDto(data);
    } catch (error) {
      throw error;
    }
  }
}
