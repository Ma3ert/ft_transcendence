/*
  Warnings:

  - You are about to drop the `_BlackedFriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlackedFriends" DROP CONSTRAINT "_BlackedFriends_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlackedFriends" DROP CONSTRAINT "_BlackedFriends_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twoFactorStatus" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_BlackedFriends";

-- CreateTable
CREATE TABLE "_BlockedFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlockedFriends_AB_unique" ON "_BlockedFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockedFriends_B_index" ON "_BlockedFriends"("B");

-- AddForeignKey
ALTER TABLE "_BlockedFriends" ADD CONSTRAINT "_BlockedFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedFriends" ADD CONSTRAINT "_BlockedFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
