import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { Injectable } from '@nestjs/common';

import { IAuthRefreshGetDTO, IAuthAccessGetDTO } from './dto/get/model.dto';
import { IAuthSigninBodyDTO } from './dto/body/model.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtStrategyService: JwtStrategyService,
    private readonly authRepository: AuthRepository,
  ) {}

  async refreshKeycloakToken(refreshToken: string): Promise<IAuthRefreshGetDTO> {
    try {
      const token = this.jwtStrategyService.decodeToken(refreshToken);
      const { clientSecret, clientId } = await this.authRepository.findActiveFarm({
        AND: {
          activeMembers: {
            some: {
              keycloakId: token.payload.sub,
            },
          },
        },
        clientId: token.payload.azp,
      });
      const {
        data: { access_token },
      } = await this.authRepository.refreshKeycloakToken(refreshToken, clientId, clientSecret);
      return { access_token } as IAuthRefreshGetDTO;
    } catch (error) {
      throw error;
    }
  }

  async signinWithKeycloakCredentials(authSigninBodyDTO: IAuthSigninBodyDTO): Promise<IAuthAccessGetDTO> {
    try {
      const { clientSecret, clientId } = await this.authRepository.findActiveFarm({
        activeMembers: {
          some: {
            username: authSigninBodyDTO.username,
          },
        },
      });
      const {
        data: { refresh_token, access_token },
      } = await this.authRepository.signinWithKeycloakCredentials(authSigninBodyDTO, clientId, clientSecret);
      return { refresh_token, access_token } as IAuthAccessGetDTO;
    } catch (error) {
      throw error;
    }
  }
}
