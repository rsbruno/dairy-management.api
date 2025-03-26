import { MeasurementUnitsController } from './measurement-units.controller';
import { MeasurementUnitsRepository } from './measurement-units.repository';
import { MeasurementUnitsService } from './measurement-units.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MeasurementUnitsController],
  providers: [MeasurementUnitsService, MeasurementUnitsRepository],
})
export class MeasurementUnitsModule {}
