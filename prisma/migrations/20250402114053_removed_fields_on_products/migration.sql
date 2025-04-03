/*
  Warnings:

  - You are about to drop the column `costCenterId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `products` table. All the data in the column will be lost.
  - Made the column `farmId` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `measurementUnitId` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_costCenterId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_farmId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_measurementUnitId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "costCenterId",
DROP COLUMN "quantity",
DROP COLUMN "unitPrice",
ALTER COLUMN "farmId" SET NOT NULL,
ALTER COLUMN "measurementUnitId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_measurementUnitId_fkey" FOREIGN KEY ("measurementUnitId") REFERENCES "measurement_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
