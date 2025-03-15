"use client";

import { useState } from "react";
import { Button, TextArea, Flex } from "@radix-ui/themes";
import { useAccount } from "wagmi"; // Assuming you're using wagmi for wallet connection
import { useCommentMutations } from "@/hooks/useComments";

type CommentFormProps = {
  postId: number;
  hasComments?: boolean;
};

export default function CommentForm({ postId, hasComments = false }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { address } = useAccount();
  const { create } = useCommentMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !address) return;

    setIsSubmitting(true);

    try {
      await create.mutateAsync({
        content,
        // creatorEns: address, //should be ENS from jwt
        creatorEns: "willywonka.eth",
        postId,
      });

      // Clear form after successful submission
      setContent("");
      // Hide the form after successful submission
      setIsFormVisible(false);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFormVisible) {
    return (
      <Flex justify='center' mb='4'>
        <Button onClick={() => setIsFormVisible(true)}>{hasComments ? "Join the conversation" : "Be the first to comment"}</Button>
      </Flex>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextArea placeholder='Add a comment...' value={content} onChange={e => setContent(e.target.value)} mb='2' size='3' />
      <Flex justify='end' gap='2'>
        <Button variant='soft' onClick={() => setIsFormVisible(false)}>
          Cancel
        </Button>
        <Button type='submit' disabled={!content.trim() || isSubmitting || !address}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </Flex>
    </form>
  );
}
