/*
  Warnings:

  - You are about to drop the column `parentCenterId` on the `costCenter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "costCenter" DROP CONSTRAINT "costCenter_parentCenterId_fkey";

-- AlterTable
ALTER TABLE "costCenter" DROP COLUMN "parentCenterId",
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "costCenter" ADD CONSTRAINT "costCenter_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "costCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
