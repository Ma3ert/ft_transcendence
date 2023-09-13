/*
  Warnings:

  - You are about to drop the column `PinValidated` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "PinValidated",
ADD COLUMN     "pinValidated" BOOLEAN NOT NULL DEFAULT false;
