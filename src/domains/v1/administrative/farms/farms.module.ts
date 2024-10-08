import { PersonsModule } from '../../identity/persons/persons.module';
import { FarmsController } from './farms.controller';
import { FarmsRepository } from './farms.repository';
import { FarmsService } from './farms.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PersonsModule],
  controllers: [FarmsController],
  providers: [FarmsService, FarmsRepository],
})
export class FarmsModule {}
