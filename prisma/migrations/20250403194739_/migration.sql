/*
  Warnings:

  - Added the required column `enabled` to the `persons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions_types" DROP CONSTRAINT "transactions_types_farmId_fkey";

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions_types" ALTER COLUMN "farmId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions_types" ADD CONSTRAINT "transactions_types_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
