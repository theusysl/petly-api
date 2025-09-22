/*
  Warnings:

  - You are about to drop the column `details` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `AdoptionRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."PetStatus" ADD VALUE 'FOUND';

-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_userId_fkey";

-- AlterTable
ALTER TABLE "public"."AdoptionRequest" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "details",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Pet" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "sex" TEXT;

-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "details",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "reporterId" INTEGER,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "reputation" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "public"."ReportType";

-- CreateTable
CREATE TABLE "public"."TemporaryHome" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "observations" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TemporaryHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EducationalContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "EducationalContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryHome_userId_key" ON "public"."TemporaryHome"("userId");

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TemporaryHome" ADD CONSTRAINT "TemporaryHome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EducationalContent" ADD CONSTRAINT "EducationalContent_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
