/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDINT', 'TEACHER');

-- CreateEnum
CREATE TYPE "bootCampRole" AS ENUM ('C#', 'JAVA', 'FullStack', 'GO', 'C++', 'Data Science');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REVIEW', 'APPROVED', 'Not Approved');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDINT';

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "Studint" (
    "id" SERIAL NOT NULL,
    "grades" TEXT NOT NULL,
    "bootcamprole" "bootCampRole" NOT NULL DEFAULT 'FullStack',
    "status" "Status" NOT NULL DEFAULT 'REVIEW',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Studint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Studint_userId_key" ON "Studint"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- AddForeignKey
ALTER TABLE "Studint" ADD CONSTRAINT "Studint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
