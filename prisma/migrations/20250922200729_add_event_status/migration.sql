-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "status" "public"."EventStatus" NOT NULL DEFAULT 'PENDING';
