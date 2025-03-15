-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "creator_ens" TEXT NOT NULL,
    "header" VARCHAR(100) NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "creator_ens" TEXT NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "ens_name" TEXT NOT NULL,
    "post_id" INTEGER,
    "comment_id" INTEGER,
    "event_type" VARCHAR(20) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "ens_name" TEXT NOT NULL,
    "badge_type" VARCHAR(50) NOT NULL,
    "awarded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "voter_ens" TEXT NOT NULL,
    "vote_type" VARCHAR(4) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_tx_hash_key" ON "Post"("tx_hash");

-- CreateIndex
CREATE INDEX "Post_creator_ens_idx" ON "Post"("creator_ens");

-- CreateIndex
CREATE INDEX "Post_tags_idx" ON "Post"("tags");

-- CreateIndex
CREATE INDEX "Post_created_at_idx" ON "Post"("created_at");

-- CreateIndex
CREATE INDEX "Comment_post_id_idx" ON "Comment"("post_id");

-- CreateIndex
CREATE INDEX "Comment_creator_ens_idx" ON "Comment"("creator_ens");

-- CreateIndex
CREATE INDEX "Notification_ens_name_idx" ON "Notification"("ens_name");

-- CreateIndex
CREATE INDEX "Notification_is_read_idx" ON "Notification"("is_read");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_ens_name_post_id_comment_id_key" ON "Notification"("ens_name", "post_id", "comment_id");

-- CreateIndex
CREATE INDEX "Badge_ens_name_idx" ON "Badge"("ens_name");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_ens_name_badge_type_key" ON "Badge"("ens_name", "badge_type");

-- CreateIndex
CREATE INDEX "Vote_post_id_idx" ON "Vote"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_post_id_voter_ens_key" ON "Vote"("post_id", "voter_ens");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
