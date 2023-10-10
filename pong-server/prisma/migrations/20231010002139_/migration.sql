/*
  Warnings:

  - You are about to drop the `_BlockedFriends` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `friendsListId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BlockedFriends" DROP CONSTRAINT "_BlockedFriends_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedFriends" DROP CONSTRAINT "_BlockedFriends_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friendsListId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BlockedFriends";

-- CreateTable
CREATE TABLE "friendsList" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friendsList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_friendsListId_fkey" FOREIGN KEY ("friendsListId") REFERENCES "friendsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
