/*
  Warnings:

  - You are about to drop the column `tenantId` on the `persons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[farmsId]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `farmsId` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "persons" DROP CONSTRAINT "persons_tenantId_fkey";

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "farmsId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_farmsId_key" ON "tenants"("farmsId");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_farmsId_fkey" FOREIGN KEY ("farmsId") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
