-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_channelId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "channelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
