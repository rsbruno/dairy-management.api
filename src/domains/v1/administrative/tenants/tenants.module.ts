import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TenantsRepository } from './tenants.repository';
import { TenantsService } from './tenants.service';

@Module({
  providers: [TenantsService, TenantsRepository],
  exports: [TenantsService, TenantsRepository],
  imports: [HttpModule],
})
export class TenantsModule {}
