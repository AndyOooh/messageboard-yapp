/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creator_address` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_post_id_fkey";

-- DropIndex
DROP INDEX "Comment_creator_ens_idx";

-- DropIndex
DROP INDEX "Post_creator_ens_idx";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "creator_address" TEXT NOT NULL,
ALTER COLUMN "creator_ens" DROP NOT NULL;

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "Notification";

-- CreateIndex
CREATE INDEX "Comment_creator_address_idx" ON "Comment"("creator_address");
