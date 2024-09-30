import { TenantsRepository } from '@/domains/v1/administrative/tenants/tenants.repository';
import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tenantsRepository: TenantsRepository,
    private readonly jwtStrategyService: JwtStrategyService,
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
      const token = this.jwtStrategyService.decodeToken(refreshToken);
      const { clientId, clientSecret } = await this.tenantsRepository.findBy({
        clientId: token.payload.azp,
      });
      const {
        data: { access_token },
      } = await this.authRepository.resfreshKeycloakToken(refreshToken, clientId, clientSecret);
      return { access_token } as IAuthRefreshGetDto;
    } catch (error) {
      throw error;
    }
  }
}
