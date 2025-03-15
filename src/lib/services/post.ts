import { prisma } from "@/lib/db";
import type { Prisma, Post } from "@prisma/client";

export async function getAll(options?: { limit?: number; offset?: number; orderBy?: Prisma.PostOrderByWithRelationInput }) {
  const { limit = 10, offset = 0, orderBy = { createdAt: "desc" } } = options || {};

  try {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy,
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
        votes: true,
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getById(id: number) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
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

  // Trigger revalidation
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?token=${process.env.REVALIDATION_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "/" }),
    });
  } catch (error) {
    // Log error but don't fail the post creation
    console.error("Failed to revalidate:", error);
  }

  return post;
}

export async function update(id: number, data: Prisma.PostUpdateInput) {
  const post = await prisma.post.update({
    where: { id },
    data,
  });

  return post;
}

export async function remove(id: number) {
  return prisma.post.delete({
    where: { id },
  });
}

export async function getByCreator(creatorEns: string) {
  const posts = await prisma.post.findMany({
    where: { creatorEns },
    orderBy: { createdAt: "desc" },
  });

  return posts;
}

export async function getByTags(tags: string[]) {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        hasSome: tags,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return posts;
}
