import { OccupationsRepository } from './occupations.repository';
import { OccupationsController } from './occupations.controller';
import { OccupationsService } from './occupations.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OccupationsController],
  providers: [OccupationsService, OccupationsRepository],
})
export class OccupationsModule {}
