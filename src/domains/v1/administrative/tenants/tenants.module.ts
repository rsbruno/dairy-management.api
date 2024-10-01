import { TenantsRepository } from './tenants.repository';
import { TenantsService } from './tenants.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  providers: [TenantsService, TenantsRepository],
  exports: [TenantsService, TenantsRepository],
  imports: [HttpModule],
})
export class TenantsModule {}
