/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `transactions_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transactions_types_code_key" ON "transactions_types"("code");
