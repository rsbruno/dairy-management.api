import { AuthConfigsService } from './auth-configs.service';
import { JwtStrategyService } from '../jwt/jwt.service';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [AuthConfigsService, JwtStrategyService],
  exports: [AuthConfigsService, JwtStrategyService],
})
export class AuthConfigsModule {}
