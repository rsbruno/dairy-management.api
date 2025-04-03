import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { IAuthRefreshGetDTO, IAuthAccessGetDTO } from './dto/get/model.dto';

@Injectable()
export class AuthRepository {
  constructor(private http: HttpService) {}

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

  async signinWithKeycloakCredentials(username: string, password: string, clientId: string, clientSecret: string) {
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
