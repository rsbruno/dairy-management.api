import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantsRepository } from './tenants.repository';
import { UsersModule } from '../../identity/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TenantsController],
  providers: [TenantsService, TenantsRepository],
})
export class TenantsModule {}
