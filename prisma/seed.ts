import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Time constants
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
const ONE_DAY = 24 * ONE_HOUR; // 1 day in milliseconds

async function main() {
  // Clean the database first
  await prisma.notification.deleteMany({});
  await prisma.vote.deleteMany({});
  await prisma.badge.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      creatorEns: "andyoee.yodl.eth",
      header: "Exploring Web3 Development",
      content: "Web3 development is revolutionizing how we think about ownership and digital assets. In this post, I want to share my journey.",
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      paid: true,
      tags: ["meme", "first-post", "ethereum"],
      upvotes: 1,
      downvotes: 0,
      status: "confirmed",
      createdAt: new Date(Date.now() - 7 * ONE_DAY), // 7 days ago
      updatedAt: new Date(Date.now() - 7 * ONE_DAY),
    },
  });

  const post2 = await prisma.post.create({
    data: {
      creatorEns: "andyoee.eth",
      header: "The Future of Decentralized Finance",
      content: "DeFi is changing the financial landscape. Here are my thoughts on where we're headed and what challenges we need to overcome.",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      paid: false,
      tags: ["announcement", "news", "ethereum"],
      upvotes: 1,
      downvotes: 0,
      status: "confirmed",
      createdAt: new Date(Date.now() - 3 * ONE_DAY), // 3 days ago
      updatedAt: new Date(Date.now() - 3 * ONE_DAY),
    },
  });

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      creatorEns: "andyoee.eth",
      content: "Great insights! I've been exploring similar concepts in my own projects.",
      createdAt: new Date(Date.now() - 6 * ONE_DAY),
      updatedAt: new Date(Date.now() - 6 * ONE_DAY),
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      postId: post2.id,
      creatorEns: "andyoee.yodl.eth",
      content: "I agree with your assessment of DeFi challenges. Security remains a major concern.",
      createdAt: new Date(Date.now() - 2 * ONE_DAY),
      updatedAt: new Date(Date.now() - 2 * ONE_DAY),
    },
  });

  // Create votes
  const vote1 = await prisma.vote.create({
    data: {
      postId: post1.id,
      voterEns: "andyoee.eth",
      voteType: "up",
      createdAt: new Date(Date.now() - 5 * ONE_DAY),
    },
  });

  const vote2 = await prisma.vote.create({
    data: {
      postId: post2.id,
      voterEns: "andyoee.yodl.eth",
      voteType: "up",
      createdAt: new Date(Date.now() - 1 * ONE_DAY),
    },
  });

  // Create badges
  const badge1 = await prisma.badge.create({
    data: {
      ensName: "andyoee.yodl.eth",
      badgeType: "founding_poster",
      awardedAt: new Date(Date.now() - 10 * ONE_DAY),
    },
  });

  const badge2 = await prisma.badge.create({
    data: {
      ensName: "andyoee.eth",
      badgeType: "thought_leader",
      awardedAt: new Date(Date.now() - 8 * ONE_DAY),
    },
  });

  // Create notifications
  const notification1 = await prisma.notification.create({
    data: {
      ensName: "andyoee.yodl.eth",
      postId: post1.id,
      commentId: comment1.id,
      eventType: "new_comment",
      isRead: false,
      createdAt: new Date(Date.now() - 6 * ONE_DAY),
    },
  });

  const notification2 = await prisma.notification.create({
    data: {
      ensName: "andyoee.yodl.eth",
      postId: post1.id,
      eventType: "new_vote",
      isRead: true,
      createdAt: new Date(Date.now() - 5 * ONE_DAY),
    },
  });

  const notification3 = await prisma.notification.create({
    data: {
      ensName: "andyoee.eth",
      postId: post2.id,
      commentId: comment2.id,
      eventType: "new_comment",
      isRead: false,
      createdAt: new Date(Date.now() - 2 * ONE_DAY),
    },
  });

  console.log("Database has been seeded!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
