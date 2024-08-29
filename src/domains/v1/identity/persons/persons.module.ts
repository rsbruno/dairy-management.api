import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { PersonsRepository } from './persons.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PersonsController],
  providers: [PersonsService, PersonsRepository],
})
export class PersonsModule {}
