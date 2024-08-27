import { filterByValidParams } from '@/utils/filter-by-valid-params';
import { IHeadersGetDto } from '@/models/headers/model.dto';
import { IUsersFindAllDto } from './dto/param/model.dto';
import { IUsersGetAllDto } from './dto/get/model.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersRepository {
  constructor(private http: HttpService) {}

  async findall(query: IUsersFindAllDto, request: Request) {
    try {
      return await lastValueFrom(
        this.http.get<Array<IUsersGetAllDto>>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
          {
            ...new IHeadersGetDto(request).getConfigs(),
            params: filterByValidParams<IUsersFindAllDto>(query),
          },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, request: Request) {
    try {
      return await lastValueFrom(
        this.http.get<IUsersGetAllDto>(
          `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`,
          new IHeadersGetDto(request).getConfigs(),
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
