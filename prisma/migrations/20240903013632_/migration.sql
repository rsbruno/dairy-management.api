-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "tenantsId" TEXT;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_tenantsId_fkey" FOREIGN KEY ("tenantsId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
