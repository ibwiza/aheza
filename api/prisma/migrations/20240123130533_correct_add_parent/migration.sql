/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Family` will be added. If there are existing duplicate values, this will fail.
  - Made the column `code` on table `Family` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Family_father_key";

-- AlterTable
ALTER TABLE "Family" ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "father" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_code_key" ON "Family"("code");
