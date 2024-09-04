/*
  Warnings:

  - You are about to drop the column `tenantsId` on the `persons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "persons" DROP CONSTRAINT "persons_tenantsId_fkey";

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "tenantsId";

-- CreateTable
CREATE TABLE "personsOnTenants" (
    "personsId" TEXT NOT NULL,
    "tenantsId" TEXT NOT NULL,

    CONSTRAINT "personsOnTenants_pkey" PRIMARY KEY ("personsId","tenantsId")
);

-- AddForeignKey
ALTER TABLE "personsOnTenants" ADD CONSTRAINT "personsOnTenants_personsId_fkey" FOREIGN KEY ("personsId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personsOnTenants" ADD CONSTRAINT "personsOnTenants_tenantsId_fkey" FOREIGN KEY ("tenantsId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
