import { Module } from '@nestjs/common';

import { PersonsModule } from '../../identity/persons/persons.module';
import { FarmsController } from './farms.controller';
import { FarmsRepository } from './farms.repository';
import { FarmsService } from './farms.service';

@Module({
  providers: [FarmsService, FarmsRepository],
  controllers: [FarmsController],
  imports: [PersonsModule],
})
export class FarmsModule {}
