-- CreateTable
CREATE TABLE "_BlackedFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlackedFriends_AB_unique" ON "_BlackedFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_BlackedFriends_B_index" ON "_BlackedFriends"("B");

-- AddForeignKey
ALTER TABLE "_BlackedFriends" ADD CONSTRAINT "_BlackedFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlackedFriends" ADD CONSTRAINT "_BlackedFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
