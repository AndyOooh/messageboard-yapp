"use client";

import { Box, Card, Flex, Text, Avatar, Separator } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import { useGetCommentsByPostId } from "@/hooks/useComments";

type Comment = {
  id: number;
  content: string;
  creatorEns: string;
  postId: number;
  createdAt: string;
  updatedAt: string;
};

type CommentListProps = {
  postId: number;
};

export default function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading, error } = useGetCommentsByPostId(postId);

  if (isLoading) {
    return <Text size='2'>Loading comments...</Text>;
  }

  if (error) {
    return (
      <Text size='2' color='red'>
        {error instanceof Error ? error.message : "Failed to load comments"}
      </Text>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <Text size='2' color='gray'>
        No comments yet
      </Text>
    );
  }

  return (
    <Box>
      <Separator size='4' my='3' />
      <Flex direction='column' gap='3'>
        {comments.map((comment: Comment) => (
          <Card key={comment.id} variant='surface' size='1'>
            <Flex direction='column' gap='2'>
              <Flex justify='between' align='center'>
                <Flex align='center' gap='2'>
                  <Avatar fallback={comment.creatorEns.substring(0, 2)} size='1' radius='full' />
                  <Text size='1' weight='bold'>
                    {comment.creatorEns}
                  </Text>
                </Flex>
                <Text size='1' color='gray'>
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </Text>
              </Flex>
              <Text size='2'>{comment.content}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}
