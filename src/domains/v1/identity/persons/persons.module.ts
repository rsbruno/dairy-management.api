import { keycloakUserModule } from '@/keycloak/users/keycloak-user.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PersonsController } from './persons.controller';
import { PersonsRepository } from './persons.repository';
import { PersonsService } from './persons.service';

@Module({
  providers: [PersonsService, PersonsRepository],
  exports: [PersonsService, PersonsRepository],
  imports: [HttpModule, keycloakUserModule],
  controllers: [PersonsController],
})
export class PersonsModule {}
