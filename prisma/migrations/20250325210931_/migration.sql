/*
  Warnings:

  - You are about to drop the column `category` on the `measurement_units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "measurement_units" DROP COLUMN "category";

-- DropEnum
DROP TYPE "MeasurementUnitsCategory";
