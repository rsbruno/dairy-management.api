import { TenantsService } from '../../administrative/tenants/tenants.service';
import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtStrategyService: JwtStrategyService,
    private readonly tenantsService: TenantsService,
    private readonly authRepository: AuthRepository,
  ) {}

  async siginWithKeycloakCredentials(username: string, password: string): Promise<IAuthAccessGetDto> {
    try {
      const { clientId, clientSecret } = await this.tenantsService.findAssignedTenants(username);
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
      const { clientId, clientSecret } = await this.tenantsService.findBy({
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
