import { TenantsRepository } from '@/domains/v1/administrative/tenants/tenants.repository';
import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async siginWithKeycloakCredentials(username: string, password: string): Promise<IAuthAccessGetDto> {
    try {
      const { clientId, clientSecret } = await this.tenantsRepository.findBy({
        members: { some: { username } },
      });
      const {
        data: { access_token, refresh_token },
      } = await this.authRepository.siginWithKeycloakCredentials(username, password, clientId, clientSecret);
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
