import { TenantsModule } from './domains/v1/administrative/tenants/tenants.module';
import { FarmsModule } from './domains/v1/administrative/farms/farms.module';
import { PersonsModule } from './domains/v1/identity/persons/persons.module';
import { AuthModule } from '@/domains/v1/identity/auth/auth.module';
import { PrismaModule } from './configs/database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    PersonsModule,
    TenantsModule,
    FarmsModule,
  ],
})
export class AppModule {}
