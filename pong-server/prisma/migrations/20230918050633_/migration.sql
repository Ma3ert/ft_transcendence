/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Matchmaking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Matchmaking" DROP CONSTRAINT "Matchmaking_userId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Matchmaking";

-- CreateTable
CREATE TABLE "ChannelMute" (
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "startMute" TIMESTAMP(3) NOT NULL,
    "mutePeriod" INTEGER NOT NULL,
    "isMuted" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelMute_pkey" PRIMARY KEY ("userId","channelId")
);

-- AddForeignKey
ALTER TABLE "ChannelMute" ADD CONSTRAINT "ChannelMute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMute" ADD CONSTRAINT "ChannelMute_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
