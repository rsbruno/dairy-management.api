-- AlterTable
ALTER TABLE "costCenter" ADD COLUMN     "parentCenterId" TEXT;

-- AddForeignKey
ALTER TABLE "costCenter" ADD CONSTRAINT "costCenter_parentCenterId_fkey" FOREIGN KEY ("parentCenterId") REFERENCES "costCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
