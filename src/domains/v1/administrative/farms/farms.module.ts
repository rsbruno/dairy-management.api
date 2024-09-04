import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { FarmsRepository } from './farms.repository';
import { TenantsModule } from '../tenants/tenants.module';
import { AuthConfigsModule } from '@/configs/auth-configs/auth-configs.module';
import { PersonsModule } from '../../identity/persons/persons.module';

@Module({
  imports: [TenantsModule, AuthConfigsModule, PersonsModule],
  controllers: [FarmsController],
  providers: [FarmsService, FarmsRepository],
})
export class FarmsModule {}
