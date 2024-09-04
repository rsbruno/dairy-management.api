import { AuthConfigsService } from './auth-configs.service';
import { JwtStrategyService } from '../jwt/jwt.service';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TenantsRepository } from '@/domains/v1/administrative/tenants/tenants.repository';
import { PersonsRepository } from '@/domains/v1/identity/persons/persons.repository';
import { PersonsModule } from '@/domains/v1/identity/persons/persons.module';
import { TenantsModule } from '@/domains/v1/administrative/tenants/tenants.module';
import { TenantsService } from '@/domains/v1/administrative/tenants/tenants.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [AuthConfigsService, JwtStrategyService, TenantsRepository, PersonsRepository],
  exports: [AuthConfigsService, JwtStrategyService, TenantsRepository, PersonsRepository],
})
export class AuthConfigsModule {}
