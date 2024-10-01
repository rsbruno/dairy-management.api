import { AuthConfigsModule } from '@/configs/auth-configs/auth-configs.module';
import { keycloakUserModule } from '@/keycloak/users/keycloak-user.module';
import { PersonsController } from './persons.controller';
import { PersonsRepository } from './persons.repository';
import { PersonsService } from './persons.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, AuthConfigsModule, keycloakUserModule],
  providers: [PersonsService, PersonsRepository],
  exports: [PersonsService, PersonsRepository],
  controllers: [PersonsController],
})
export class PersonsModule {}
