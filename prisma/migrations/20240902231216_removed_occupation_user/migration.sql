/*
  Warnings:

  - You are about to drop the column `occupationsId` on the `persons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "persons" DROP CONSTRAINT "persons_occupationsId_fkey";

-- AlterTable
ALTER TABLE "persons" DROP COLUMN "occupationsId";
