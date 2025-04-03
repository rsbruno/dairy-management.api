import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { KeycloakUserRepository } from './keycloak-user.repository';
import { KeycloakUserService } from './keycloak-user.service';

@Module({
  providers: [KeycloakUserService, KeycloakUserRepository],
  exports: [KeycloakUserService, KeycloakUserRepository],
  imports: [HttpModule],
})
export class keycloakUserModule {}
