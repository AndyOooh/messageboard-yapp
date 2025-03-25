/*
  Warnings:

  - Added the required column `creator_address` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "creator_address" TEXT NOT NULL,
ALTER COLUMN "creator_ens" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Post_creator_address_idx" ON "Post"("creator_address");
