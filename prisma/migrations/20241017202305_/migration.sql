/*
  Warnings:

  - Added the required column `typeId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmId` to the `transactions_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions_types" ADD COLUMN     "farmId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "transactions_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_types" ADD CONSTRAINT "transactions_types_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
