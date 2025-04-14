import { Module } from '@nestjs/common';

import { PersonsModule } from '../../identity/persons/persons.module';
import { AuthModule } from '../../identity/auth/auth.module';
import { FarmsController } from './farms.controller';
import { FarmsRepository } from './farms.repository';
import { FarmsService } from './farms.service';

@Module({
  providers: [FarmsService, FarmsRepository],
  imports: [PersonsModule, AuthModule],
  controllers: [FarmsController],
})
export class FarmsModule {}
