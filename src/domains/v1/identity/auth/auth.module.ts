import { TenantsModule } from '../../administrative/tenants/tenants.module';
import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, TenantsModule],
  providers: [AuthService, AuthRepository, JwtStrategyService],
  controllers: [AuthController],
})
export class AuthModule {}
