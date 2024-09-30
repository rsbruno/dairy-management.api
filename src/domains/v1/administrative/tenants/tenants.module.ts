import { AuthConfigsModule } from '@/configs/auth-configs/auth-configs.module';
import { PersonsModule } from '@/domains/v1/identity/persons/persons.module';
import { TenantsRepository } from './tenants.repository';
import { TenantsService } from './tenants.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthConfigsModule, PersonsModule, HttpModule],
  providers: [TenantsService, TenantsRepository],
  exports: [TenantsService, TenantsRepository],
})
export class TenantsModule {}
