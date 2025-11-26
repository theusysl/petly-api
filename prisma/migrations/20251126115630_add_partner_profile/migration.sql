-- CreateTable
CREATE TABLE "public"."PartnerProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cnpj" TEXT,
    "website" TEXT,
    "pixKey" TEXT,
    "description" TEXT,
    "openingHours" TEXT,
    "services" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_userId_key" ON "public"."PartnerProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."PartnerProfile" ADD CONSTRAINT "PartnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
