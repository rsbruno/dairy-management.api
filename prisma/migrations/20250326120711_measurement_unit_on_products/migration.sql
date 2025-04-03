-- AlterTable
ALTER TABLE "products" ADD COLUMN     "measurementUnitId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_measurementUnitId_fkey" FOREIGN KEY ("measurementUnitId") REFERENCES "measurement_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
