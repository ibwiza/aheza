/*
  Warnings:

  - A unique constraint covering the columns `[father]` on the table `Family` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `father` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'PARENT';

-- DropIndex
DROP INDEX "Family_code_key";

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "father" TEXT NOT NULL,
ADD COLUMN     "mother" TEXT,
ALTER COLUMN "code" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_father_key" ON "Family"("father");
