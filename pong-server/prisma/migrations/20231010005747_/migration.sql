/*
  Warnings:

  - You are about to drop the `friendsList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blockedUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_friendsListId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blockedUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "friendsList";

-- CreateTable
CREATE TABLE "userFriends" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userFriends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blockedUsers" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blockedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userFriends_owner_key" ON "userFriends"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "blockedUsers_owner_key" ON "blockedUsers"("owner");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_friendsListId_fkey" FOREIGN KEY ("friendsListId") REFERENCES "userFriends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "blockedUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
