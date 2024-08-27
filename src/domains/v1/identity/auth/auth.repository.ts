import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthRepository {
  constructor(private http: HttpService) {}

  async siginWithKeycloakCredentials(username: string, password: string) {
    try {
      return await lastValueFrom(
        this.http.post<IAuthAccessGetDto>(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          new URLSearchParams({
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            grant_type: 'password',
            username,
            password,
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async resfreshKeycloakToken(refreshToken: string) {
    try {
      return await lastValueFrom(
        this.http.post<IAuthRefreshGetDto>(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          new URLSearchParams({
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async logoutToken(refreshToken: string) {
    try {
      return await lastValueFrom(
        this.http.post(
          `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`,
          new URLSearchParams({
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            refresh_token: refreshToken,
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
