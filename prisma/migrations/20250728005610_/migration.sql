/*
  Warnings:

  - You are about to drop the column `bootcamprole` on the `Studint` table. All the data in the column will be lost.
  - You are about to drop the column `grades` on the `Studint` table. All the data in the column will be lost.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Studint" DROP COLUMN "bootcamprole",
DROP COLUMN "grades",
ADD COLUMN     "comments" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "cellPhone" TEXT,
    "city" TEXT,
    "currentStatus" "Status" NOT NULL,
    "state" TEXT,
    "zipCode" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_studentId_teacherId_key" ON "Review"("studentId", "teacherId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Studint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
