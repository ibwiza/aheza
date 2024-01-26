/*
  Warnings:

  - The primary key for the `Contribution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cid` on the `Contribution` table. All the data in the column will be lost.
  - The primary key for the `Family` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cid` on the `Family` table. All the data in the column will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cid` on the `Member` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_familyId_fkey";

-- DropIndex
DROP INDEX "Contribution_cid_key";

-- DropIndex
DROP INDEX "Family_cid_key";

-- DropIndex
DROP INDEX "Member_cid_key";

-- AlterTable
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_pkey",
DROP COLUMN "cid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Contribution_id_seq";

-- AlterTable
ALTER TABLE "Family" DROP CONSTRAINT "Family_pkey",
DROP COLUMN "cid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Family_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Family_id_seq";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "cid",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "familyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Member_id_seq";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
