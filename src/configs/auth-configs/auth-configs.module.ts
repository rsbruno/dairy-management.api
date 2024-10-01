import { TenantsRepository } from '@/domains/v1/administrative/tenants/tenants.repository';
import { PersonsRepository } from '@/domains/v1/identity/persons/persons.repository';
import { keycloakUserModule } from '@/keycloak/users/keycloak-user.module';
import { AuthConfigsService } from './auth-configs.service';
import { JwtStrategyService } from '../jwt/jwt.service';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule, keycloakUserModule],
  providers: [AuthConfigsService, JwtStrategyService, TenantsRepository, PersonsRepository],
  exports: [AuthConfigsService, JwtStrategyService, TenantsRepository, PersonsRepository],
})
export class AuthConfigsModule {}
