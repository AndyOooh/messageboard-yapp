"use client";

import { useState } from "react";
import { Card, Flex, Text, Heading, Badge, Box, Button, Avatar } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import CommentList from "@/components/CommentList";
import { PostExtended } from "@/types";
import { useVote } from "@/hooks/useVotes";
import Link from "next/link";
import { tags } from "@/constants";

type PostCardProps = {
  post: PostExtended;
};

export default function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost);
  const { mutate: vote, isPending } = useVote();
  const [showComments, setShowComments] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [currentUserEns] = useState("demo.eth"); // Replace with actual user ENS

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!commentsLoaded && !showComments) {
      setCommentsLoaded(true);
    }
  };

  const userVote = post.votes?.find(v => v.voterEns === currentUserEns);

  const handleVote = (voteType: "up" | "down") => {
    if (isPending) return;

    vote(
      {
        postId: post.id,
        voterEns: currentUserEns,
        voteType,
      },
      {
        onSuccess: updatedPost => {
          setPost(updatedPost);
        },
      }
    );
  };

  return (
    <Card>
      <Flex direction='column' gap='3'>
        <Flex justify='between' align='center'>
          <Flex align='center' gap='2'>
            <Avatar fallback={post.creatorEns.substring(0, 2)} size='2' />
            <Text size='2' color='gray'>
              {post.creatorEns}
            </Text>
          </Flex>
          <Text size='1' color='gray'>
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </Text>
        </Flex>

        {/* Make only the title and content clickable */}
        <Link href={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Box style={{ cursor: "pointer" }}>
            <Heading size='4'>{post.header}</Heading>
            <Text>{post.content}</Text>
          </Box>
        </Link>

        <Flex gap='2' wrap='wrap'>
          {post.tags.map(tag => (
            <Badge key={tag} variant='soft' color={tags.find(t => t.name === tag)?.color}>
              {tag}
            </Badge>
          ))}
        </Flex>

        <Flex justify='between' align='center'>
          <Flex gap='3'>
            <Button variant='ghost' onClick={() => handleVote("up")} color={userVote?.voteType === "up" ? "green" : "gray"} disabled={isPending}>
              ↑ {post.upvotes}
            </Button>
            <Button variant='ghost' onClick={() => handleVote("down")} color={userVote?.voteType === "down" ? "red" : "gray"} disabled={isPending}>
              ↓ {post.downvotes}
            </Button>
          </Flex>

          <Button variant='ghost' onClick={toggleComments}>
            {showComments ? "Hide Comments" : `Show Comments (${post._count?.comments || 0})`}
          </Button>
        </Flex>

        {/* Lazy load comments only when expanded */}
        {showComments && commentsLoaded && (
          <Box pt='2'>
            <CommentList postId={post.id} />
          </Box>
        )}
      </Flex>
    </Card>
  );
}
