/*
  Warnings:

  - Changed the type of `cnpj` on the `farms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "farms" DROP COLUMN "cnpj",
ADD COLUMN     "cnpj" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "farms_cnpj_key" ON "farms"("cnpj");
