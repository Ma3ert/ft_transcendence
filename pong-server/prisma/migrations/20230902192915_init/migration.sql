-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE', 'INMATCH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "twoFactor" BOOLEAN NOT NULL,
    "xp" INTEGER NOT NULL,
    "ladelLevel" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "friendsListId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendsList" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FriendsList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_friendsListId_fkey" FOREIGN KEY ("friendsListId") REFERENCES "FriendsList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
