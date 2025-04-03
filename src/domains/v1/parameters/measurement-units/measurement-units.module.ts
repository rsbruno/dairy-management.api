import { Module } from '@nestjs/common';

import { MeasurementUnitsController } from './measurement-units.controller';
import { MeasurementUnitsRepository } from './measurement-units.repository';
import { MeasurementUnitsService } from './measurement-units.service';

@Module({
  providers: [MeasurementUnitsService, MeasurementUnitsRepository],
  controllers: [MeasurementUnitsController],
})
export class MeasurementUnitsModule {}
