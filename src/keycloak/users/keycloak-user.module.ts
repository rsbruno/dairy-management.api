import { KeycloakUserRepository } from './keycloak-user.repository';
import { KeycloakUserService } from './keycloak-user.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [KeycloakUserService, KeycloakUserRepository],
  exports: [KeycloakUserService, KeycloakUserRepository],
})
export class keycloakUserModule {}
