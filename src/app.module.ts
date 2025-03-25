/* import { TenantsModule } from './domains/v1/administrative/tenants/tenants.module';
import { FarmsModule } from './domains/v1/administrative/farms/farms.module'; */
/* import { PersonsModule } from './domains/v1/identity/persons/persons.module'; */
/* import { AuthModule } from '@/domains/v1/identity/auth/auth.module'; */
import { PrismaModule } from './configs/database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './domains/v1/identity/auth/auth.module';
import { PersonsModule } from './domains/v1/identity/persons/persons.module';
import { AuthConfigsModule } from './configs/auth-configs/auth-configs.module';
import { FarmsModule } from './domains/v1/administrative/farms/farms.module';
import { CostCenterModule } from './domains/v1/finance/cost-center/cost-center.module';
import { ProductsModule } from './domains/v1/administrative/products/products.module';
import { TransactionsModule } from './domains/v1/finance/transactions/transactions.module';
import { TransactionsTypesModule } from './domains/v1/finance/transactions-types/transactions-types.module';
import { MeasurementUnitsModule } from './domains/v1/parameters/measurement-units/measurement-units.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    PersonsModule,
    AuthConfigsModule,
    FarmsModule,
    CostCenterModule,
    ProductsModule,
    TransactionsModule,
    TransactionsTypesModule,
    MeasurementUnitsModule,
  ],
})
export class AppModule {}
