/*
  Warnings:

  - You are about to drop the column `isMuted` on the `ChannelMute` table. All the data in the column will be lost.
  - You are about to drop the column `mutePeriod` on the `ChannelMute` table. All the data in the column will be lost.
  - You are about to drop the column `startMute` on the `ChannelMute` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChannelMute" DROP COLUMN "isMuted",
DROP COLUMN "mutePeriod",
DROP COLUMN "startMute";
