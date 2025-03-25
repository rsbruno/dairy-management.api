-- CreateEnum
CREATE TYPE "MeasurementUnitsCategory" AS ENUM ('Volume', 'Quantity', 'Weight', 'Area', 'Work', 'Others', 'Energy', 'Financial', 'Length', 'Service', 'Time');

-- CreateTable
CREATE TABLE "measurement_units" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" "MeasurementUnitsCategory" NOT NULL,
    "farmId" TEXT,
    "baseUnit" TEXT NOT NULL,
    "conversionRate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_units_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measurement_units" ADD CONSTRAINT "measurement_units_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
