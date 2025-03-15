import { NextRequest, NextResponse } from "next/server";
import * as CommentService from "@/lib/services/comment";

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const postId = parseInt(params.postId);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const comments = await CommentService.getByPostId(postId);

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const postId = parseInt(params.postId);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await request.json();
    const { content, creatorEns } = body;

    if (!content || !creatorEns) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comment = await CommentService.create({
      content,
      creatorEns,
      post: {
        connect: { id: postId },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
