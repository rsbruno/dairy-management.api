/*
  Warnings:

  - You are about to drop the `personsOnTenants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "personsOnTenants" DROP CONSTRAINT "personsOnTenants_personsId_fkey";

-- DropForeignKey
ALTER TABLE "personsOnTenants" DROP CONSTRAINT "personsOnTenants_tenantsId_fkey";

-- DropTable
DROP TABLE "personsOnTenants";

-- CreateTable
CREATE TABLE "_PersonsToTenants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PersonsToTenants_AB_unique" ON "_PersonsToTenants"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonsToTenants_B_index" ON "_PersonsToTenants"("B");

-- AddForeignKey
ALTER TABLE "_PersonsToTenants" ADD CONSTRAINT "_PersonsToTenants_A_fkey" FOREIGN KEY ("A") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonsToTenants" ADD CONSTRAINT "_PersonsToTenants_B_fkey" FOREIGN KEY ("B") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
