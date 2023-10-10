/*
  Warnings:

  - A unique constraint covering the columns `[owner]` on the table `friendsList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "friendsList_owner_key" ON "friendsList"("owner");
