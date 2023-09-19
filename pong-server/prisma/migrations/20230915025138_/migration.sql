-- CreateTable
CREATE TABLE "Matchmaking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Matchmaking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "playerOne" TEXT NOT NULL,
    "playerTwo" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "playerOneScore" INTEGER NOT NULL DEFAULT 0,
    "playerTwoScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Matchmaking_userId_key" ON "Matchmaking"("userId");

-- AddForeignKey
ALTER TABLE "Matchmaking" ADD CONSTRAINT "Matchmaking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
