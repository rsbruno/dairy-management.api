import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async siginWithKeycloakCredentials(username: string, password: string): Promise<IAuthAccessGetDto> {
    try {
      const {
        data: { access_token, refresh_token },
      } = await this.authRepository.siginWithKeycloakCredentials(username, password);
      return { access_token, refresh_token } as IAuthAccessGetDto;
    } catch (error) {
      throw error;
    }
  }

  async resfreshKeycloakToken(refreshToken: string): Promise<IAuthRefreshGetDto> {
    try {
      const {
        data: { access_token },
      } = await this.authRepository.resfreshKeycloakToken(refreshToken);
      return { access_token } as IAuthRefreshGetDto;
    } catch (error) {
      throw error;
    }
  }

  async logoutToken(refreshToken: string) {
    try {
      return await this.authRepository.logoutToken(refreshToken);
    } catch (error) {
      throw error;
    }
  }
}
