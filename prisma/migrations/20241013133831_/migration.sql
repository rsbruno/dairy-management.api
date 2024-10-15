/*
  Warnings:

  - You are about to drop the column `farmsId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_farmsId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "farmsId",
ADD COLUMN     "farmId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
