import { Module } from '@nestjs/common';

import { CostCenterController } from './cost-center.controller';
import { CostCenterRepository } from './cost-center.repository';
import { CostCenterService } from './cost-center.service';

@Module({
  providers: [CostCenterService, CostCenterRepository],
  controllers: [CostCenterController],
  imports: [],
})
export class CostCenterModule {}
