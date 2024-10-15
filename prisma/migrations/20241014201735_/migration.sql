/*
  Warnings:

  - You are about to drop the `cost_center` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cost_center" DROP CONSTRAINT "cost_center_farmId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_costCenterId_fkey";

-- DropTable
DROP TABLE "cost_center";

-- CreateTable
CREATE TABLE "costCenter" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "farmId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "costCenter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "costCenter" ADD CONSTRAINT "costCenter_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "costCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
