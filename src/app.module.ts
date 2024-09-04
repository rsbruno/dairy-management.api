import { OccupationsModule } from '@/domains/v1/administration/occupations/occupations.module';
import { TenantsModule } from './domains/v1/administrative/tenants/tenants.module';
import { PersonsModule } from './domains/v1/identity/persons/persons.module';
import { AuthModule } from '@/domains/v1/identity/auth/auth.module';
import { PrismaModule } from './configs/database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FarmsModule } from './domains/v1/administrative/farms/farms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    OccupationsModule,
    PrismaModule,
    PersonsModule,
    TenantsModule,
    FarmsModule,
  ],
})
export class AppModule {}
