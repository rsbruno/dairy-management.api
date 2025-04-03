/*
  Warnings:

  - You are about to alter the column `code` on the `transactions_types` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(20)`.
  - You are about to drop the `costCenter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "costCenter" DROP CONSTRAINT "costCenter_farmId_fkey";

-- DropForeignKey
ALTER TABLE "costCenter" DROP CONSTRAINT "costCenter_parentId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_costCenterId_fkey";

-- AlterTable
ALTER TABLE "transactions_types" ALTER COLUMN "code" SET DATA TYPE VARCHAR(20);

-- DropTable
DROP TABLE "costCenter";

-- CreateTable
CREATE TABLE "cost_center" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "code" VARCHAR(20),
    "farmId" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cost_center_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cost_center_code_key" ON "cost_center"("code");

-- AddForeignKey
ALTER TABLE "cost_center" ADD CONSTRAINT "cost_center_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center" ADD CONSTRAINT "cost_center_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "cost_center"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "cost_center"("id") ON DELETE SET NULL ON UPDATE CASCADE;
