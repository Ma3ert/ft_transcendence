/*
  Warnings:

  - You are about to drop the column `blockedUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `friendsListId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `blockedUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userFriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_blockedUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_friendsListId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "blockedUserId",
DROP COLUMN "friendsListId";

-- DropTable
DROP TABLE "blockedUsers";

-- DropTable
DROP TABLE "userFriends";

-- CreateTable
CREATE TABLE "_Friendship" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BlackedFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "_Friendship"("A", "B");

-- CreateIndex
CREATE INDEX "_Friendship_B_index" ON "_Friendship"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlackedFriends_AB_unique" ON "_BlackedFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_BlackedFriends_B_index" ON "_BlackedFriends"("B");

-- AddForeignKey
ALTER TABLE "_Friendship" ADD CONSTRAINT "_Friendship_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friendship" ADD CONSTRAINT "_Friendship_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackedFriends" ADD CONSTRAINT "_BlackedFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackedFriends" ADD CONSTRAINT "_BlackedFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
