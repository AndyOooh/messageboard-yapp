"use client";

import { useParams } from "next/navigation";
import { Container, Box, Heading, Text } from "@radix-ui/themes";
import PostCard from "@/components/PostCard";
import CommentList from "@/components/CommentList";
import { useGetPostById } from "@/hooks/usePosts";
import CommentForm from "@/components/CommentForm";
import { useGetCommentsByPostId } from "@/hooks/useComments";

export default function PostPage() {
  const params = useParams();
  const postId = Number(params.id);

  const { data: post, isLoading: isLoadingPost, error: postError } = useGetPostById(postId);
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsByPostId(postId);

  if (isLoadingPost) {
    return (
      <Container size='2' py='6'>
        <Text>Loading post...</Text>
      </Container>
    );
  }

  if (postError || !post) {
    return (
      <Container size='2' py='6'>
        <Text color='red'>{postError instanceof Error ? postError.message : "Post not found"}</Text>
      </Container>
    );
  }

  const hasComments = Boolean(comments && comments.length > 0);

  return (
    <Container size='2' py='6'>
      <Box mb='6'>
        <PostCard post={post} />
      </Box>

      <Box>
        <Heading size='4' mb='4'>
          Comments
        </Heading>

        <Box mb='4'>
          <CommentForm postId={postId} hasComments={hasComments} />
        </Box>

        <CommentList postId={postId} />
      </Box>
    </Container>
  );
}
