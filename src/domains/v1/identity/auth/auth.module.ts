import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TenantsModule } from '../../administrative/tenants/tenants.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthRepository, JwtStrategyService],
  imports: [HttpModule, TenantsModule],
  controllers: [AuthController],
})
export class AuthModule {}
