import { JwtStrategyService } from '@/configs/jwt/jwt.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthRepository, JwtStrategyService],
  exports: [AuthService, AuthRepository, JwtStrategyService],
  controllers: [AuthController],
  imports: [HttpModule],
})
export class AuthModule {}
