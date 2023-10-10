-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_blockedUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_friendsListId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "friendsListId" DROP NOT NULL,
ALTER COLUMN "blockedUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_friendsListId_fkey" FOREIGN KEY ("friendsListId") REFERENCES "userFriends"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "blockedUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
