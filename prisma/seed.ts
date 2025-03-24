import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

async function main() {
  // Clean the database first
  await prisma.vote.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      creatorEns: 'andyoee.yodl.eth',
      creatorAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      header: 'Exploring Web3 Development',
      content:
        'Web3 development is revolutionizing how we think about ownership and digital assets. In this post, I want to share my journey.',
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      paid: true,
      tags: ['meme', 'first-post', 'ethereum'],
      upvotes: 1,
      downvotes: 0,
      createdAt: new Date(Date.now() - 7 * ONE_DAY),
      updatedAt: new Date(Date.now() - 7 * ONE_DAY),
    },
  });

  const post2 = await prisma.post.create({
    data: {
      creatorEns: 'andyoee.eth',
      creatorAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      header: 'The Future of Decentralized Finance',
      content:
        "DeFi is changing the financial landscape. Here are my thoughts on where we're headed and what challenges we need to overcome.",
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      paid: false,
      tags: ['announcement', 'news', 'ethereum'],
      upvotes: 1,
      downvotes: 0,
      createdAt: new Date(Date.now() - 3 * ONE_DAY),
      updatedAt: new Date(Date.now() - 3 * ONE_DAY),
    },
  });

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      creatorEns: 'andyoee.eth',
      creatorAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      content: "Great insights! I've been exploring similar concepts in my own projects.",
      createdAt: new Date(Date.now() - 6 * ONE_DAY),
      updatedAt: new Date(Date.now() - 6 * ONE_DAY),
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      postId: post2.id,
      creatorEns: 'andyoee.yodl.eth',
      creatorAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      content: 'I agree with your assessment of DeFi challenges. Security remains a major concern.',
      createdAt: new Date(Date.now() - 2 * ONE_DAY),
      updatedAt: new Date(Date.now() - 2 * ONE_DAY),
    },
  });

  // Create votes
  const vote1 = await prisma.vote.create({
    data: {
      postId: post1.id,
      voterEns: 'andyoee.eth',
      voteType: 'up',
      createdAt: new Date(Date.now() - 5 * ONE_DAY),
    },
  });

  const vote2 = await prisma.vote.create({
    data: {
      postId: post2.id,
      voterEns: 'andyoee.yodl.eth',
      voteType: 'up',
      createdAt: new Date(Date.now() - 1 * ONE_DAY),
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
