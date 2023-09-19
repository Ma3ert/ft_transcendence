/*
  Warnings:

  - The primary key for the `ChannelUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ChannelUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ChannelUser" DROP CONSTRAINT "ChannelUser_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ChannelUser_pkey" PRIMARY KEY ("id");
