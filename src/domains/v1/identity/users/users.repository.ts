import { IHeadersGetDto } from '@/models/headers/model.dto';
import { IUsersGetAllDto } from './dto/get/model.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersRepository {
  constructor(private http: HttpService) {}

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
