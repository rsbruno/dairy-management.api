import { CostCenterController } from './cost-center.controller';
import { CostCenterRepository } from './cost-center.repository';
import { CostCenterService } from './cost-center.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [CostCenterService, CostCenterRepository],
  controllers: [CostCenterController],
})
export class CostCenterModule {}
