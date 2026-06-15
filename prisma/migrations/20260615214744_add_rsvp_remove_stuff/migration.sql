/*
  Warnings:

  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stuff";

-- DropEnum
DROP TYPE "Condition";

-- CreateTable
CREATE TABLE "RSVP" (
    "id" SERIAL NOT NULL,
    "primaryGuest" TEXT NOT NULL,
    "email" TEXT,
    "side" TEXT NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "guestNames" TEXT NOT NULL,
    "events" TEXT NOT NULL,
    "dietaryNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);
