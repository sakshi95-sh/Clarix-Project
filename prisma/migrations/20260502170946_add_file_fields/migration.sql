/*
  Warnings:

  - You are about to drop the column `fileName` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "fileName",
ADD COLUMN     "fileType" TEXT;
