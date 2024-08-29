import { OccupationsModule } from '@/domains/v1/administration/occupations/occupations.module';
import { UsersModule } from '@/domains/v1/identity/users/users.module';
import { AuthModule } from '@/domains/v1/identity/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './configs/database/prisma.module';
import { PersonsModule } from './domains/v1/identity/persons/persons.module';
import { TenantsModule } from './domains/v1/administrative/tenants/tenants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    OccupationsModule,
    PrismaModule,
    PersonsModule,
    TenantsModule,
  ],
})
export class AppModule {}
