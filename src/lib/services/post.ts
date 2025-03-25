import { YAPP_URL } from '@/constants';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export async function getAll(options?: {
  limit?: number;
  offset?: number;
  orderBy?: Prisma.PostOrderByWithRelationInput;
}) {
  const { limit = 10, offset = 0, orderBy = { createdAt: 'desc' } } = options || {};

  try {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy,
      where: {
        paid: true,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
        votes: true,
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

export async function getById(id: number) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
      comments: {
        orderBy: { createdAt: 'desc' },
      },
      votes: true,
    },
  });

  return post;
}

export async function create(data: Prisma.PostCreateInput) {
  const post = await prisma.post.create({
    data,
  });

  return post;
}

export async function update(id: number, data: Prisma.PostUpdateInput) {
  const post = await prisma.post.update({
    where: { id },
    data,
  });

  // Only trigger revalidation if the post is being marked as paid
  if (post.paid === true) {
    try {
      const revalidateUrl = `${YAPP_URL}/api/revalidate`;
      await fetch(`${revalidateUrl}?token=${process.env.REVALIDATION_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' }),
        cache: 'no-store',
      });
    } catch (error) {
      console.error('Failed to revalidate:', error);
    }
  }

  return post;
}

export async function remove(id: number) {
  return prisma.post.delete({
    where: { id },
  });
}
