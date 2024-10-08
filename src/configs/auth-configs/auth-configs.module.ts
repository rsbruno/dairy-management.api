import { keycloakUserModule } from '@/keycloak/users/keycloak-user.module';
import { AuthConfigsRepository } from './auth-configs.repository';
import { AuthConfigsService } from './auth-configs.service';
import { JwtStrategyService } from '../jwt/jwt.service';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule, keycloakUserModule],
  providers: [AuthConfigsService, AuthConfigsRepository, JwtStrategyService],
  exports: [AuthConfigsService, AuthConfigsRepository, JwtStrategyService],
})
export class AuthConfigsModule {}
