-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PinValidated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorPin" TEXT;
