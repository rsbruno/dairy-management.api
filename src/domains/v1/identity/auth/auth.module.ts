import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { TenantsModule } from '../../administrative/tenants/tenants.module';
import { TenantsRepository } from '../../administrative/tenants/tenants.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, TenantsModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategyService],
})
export class AuthModule {}
