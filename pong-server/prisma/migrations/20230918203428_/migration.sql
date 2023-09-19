-- CreateTable
CREATE TABLE "UserInvite" (
    "id" TEXT NOT NULL,
    "inviteUserId" TEXT NOT NULL,
    "inviteOwnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_inviteUserId_fkey" FOREIGN KEY ("inviteUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvite" ADD CONSTRAINT "UserInvite_inviteOwnerId_fkey" FOREIGN KEY ("inviteOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
