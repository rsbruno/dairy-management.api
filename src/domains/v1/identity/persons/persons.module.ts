import { AuthConfigsModule } from '@/configs/auth-configs/auth-configs.module';
import { TenantsModule } from '../../administrative/tenants/tenants.module';
import { PersonsController } from './persons.controller';
import { PersonsRepository } from './persons.repository';
import { PersonsService } from './persons.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, AuthConfigsModule],
  controllers: [PersonsController],
  providers: [PersonsService, PersonsRepository],
  exports: [PersonsService, PersonsRepository],
})
export class PersonsModule {}
