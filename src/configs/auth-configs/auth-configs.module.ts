import { keycloakUserModule } from '@/keycloak/users/keycloak-user.module';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthConfigsRepository } from './auth-configs.repository';
import { AuthConfigsService } from './auth-configs.service';
import { JwtStrategyService } from '../jwt/jwt.service';

@Global()
@Module({
  providers: [AuthConfigsService, AuthConfigsRepository, JwtStrategyService],
  exports: [AuthConfigsService, AuthConfigsRepository, JwtStrategyService],
  imports: [HttpModule, keycloakUserModule],
})
export class AuthConfigsModule {}
