import { NextRequest, NextResponse } from "next/server";
import * as PostService from "@/lib/services/post";
import { getPayment } from "@/lib/services/indexerApi";
import { validatePayment } from "./validatePayment";
import { sdk } from "@/lib/sdk";

type RouteParams = { params: Promise<{ postId: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { postId } = await params;
    const postIdInt = parseInt(postId);

    if (isNaN(postIdInt)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const post = await PostService.getById(postIdInt);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { postId } = await params;
    const postIdInt = parseInt(postId);

    if (isNaN(postIdInt)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate the data
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No update data provided" }, { status: 400 });
    }

    const payment = await getPayment(data.txHash);
    const { community } = await sdk.getUserContext();
    const yodlCommunityAddress = "0x0000000000000000000000000000000000000000";
    const receiver = community?.address || yodlCommunityAddress;
    const isValidPayment = validatePayment(payment, receiver, postId);

    if (!isValidPayment) {
      return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
    }

    const updatedPost = await PostService.update(postIdInt, {
      txHash: data.txHash,
      paid: true,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { postId } = await params;
    const postIdInt = parseInt(postId);

    if (isNaN(postIdInt)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const { address } = await sdk.getUserContext();
    const post = await PostService.getById(postIdInt);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // TODO use address instead of ens in Post
    if (post.creatorEns !== address) {
      return NextResponse.json({ error: "You are not the creator of this post" }, { status: 403 });
    }

    await PostService.remove(postIdInt);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
