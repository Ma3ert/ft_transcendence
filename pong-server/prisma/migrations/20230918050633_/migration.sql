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
