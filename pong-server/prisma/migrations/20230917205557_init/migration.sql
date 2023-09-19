/*
  Warnings:

  - The primary key for the `ChannelUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `ChannelUser` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ChannelUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChannelUser" DROP CONSTRAINT "ChannelUser_pkey",
DROP COLUMN "created_at",
DROP COLUMN "id",
ADD CONSTRAINT "ChannelUser_pkey" PRIMARY KEY ("userId", "channelId");
