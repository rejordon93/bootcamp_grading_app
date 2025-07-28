-- CreateEnum
CREATE TYPE "role" AS ENUM ('studint', 'teacher');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'studint';
