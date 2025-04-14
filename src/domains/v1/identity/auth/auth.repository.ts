import { PrismaService } from '@/configs/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { lastValueFrom } from 'rxjs';

import { IFarmsSelectDTO } from '../../administrative/farms/dto/get/model.dto';
import { IAuthRefreshGetDTO, IAuthAccessGetDTO } from './dto/get/model.dto';
import { IAuthSigninBodyDTO } from './dto/body/model.dto';

@Injectable()
export class AuthRepository {
  constructor(
    private http: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async findActiveFarm(where: Prisma.FarmsWhereInput): Promise<IFarmsSelectDTO> {
    try {
      return (await this.prisma.farms.findFirstOrThrow({ where })) as unknown as IFarmsSelectDTO;
    } catch (error) {
      throw error;
    }
  }

  async refreshKeycloakToken(refreshToken: string, clientId: string, clientSecret: string) {
    try {
      return await lastValueFrom(
        this.http.post<IAuthRefreshGetDTO>(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          new URLSearchParams({
            refresh_token: refreshToken,
            client_secret: clientSecret,
            grant_type: 'refresh_token',
            client_id: clientId,
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async signinWithKeycloakCredentials(
    { password, username }: IAuthSigninBodyDTO,
    clientId: string,
    clientSecret: string,
  ) {
    try {
      return await lastValueFrom(
        this.http.post<IAuthAccessGetDTO>(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          new URLSearchParams({
            client_secret: clientSecret,
            grant_type: 'password',
            client_id: clientId,
            username,
            password,
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
