import { NextRequest, NextResponse } from "next/server";
import * as VoteService from "@/lib/services/vote";

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const postId = parseInt(params.postId);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const { voterEns, voteType } = await request.json();

    if (!voterEns || !voteType || !["up", "down"].includes(voteType)) {
      return NextResponse.json({ error: "Invalid vote data" }, { status: 400 });
    }

    const result = await VoteService.upsertVote(postId, voterEns, voteType as "up" | "down");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json({ error: "Failed to process vote" }, { status: 500 });
  }
}
