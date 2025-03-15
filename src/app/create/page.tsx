"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, Text, TextField, TextArea, Select, Badge } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { useToast } from "@/providers/ToastProvider";
import { tags } from "@/constants";

export default function CreatePostPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    header: "",
    content: "",
    tags: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tagName: string) => {
    setFormData(prev => {
      // If tag is already selected, remove it, otherwise add it
      if (prev.tags.includes(tagName)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tagName) };
      } else {
        return { ...prev, tags: [...prev.tags, tagName] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error("Please connect your wallet to create a post");
      return;
    }

    if (!formData.header.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setIsSubmitting(true);

      // In a real implementation, you would:
      // 1. Create a transaction for the post
      // 2. Wait for the transaction to be mined
      // 3. Save the post to the database with the transaction hash

      // For now, we'll simulate this with a direct API call
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorEns: 'kingofcool.eth', // In production, you'd resolve the ENS name
          header: formData.header,
          content: formData.content,
          tags: formData.tags,
          txHash: `0x${Math.random().toString(16).slice(2)}`, // Simulated tx hash
          paid: true, // Simulated amount as string
          status: "confirmed", // In production, this would start as "pending"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      toast.success("Post created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className='max-w-2xl mx-auto p-4'>
      <Heading size='6' mb='4'>
        Create a Post
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex direction='column' gap='4'>
          <Box>
            <Text as='label' size='2' mb='1' weight='bold'>
              Title*
            </Text>
            <TextField.Root name='header' value={formData.header} onChange={handleChange} placeholder='Title' size='3' maxLength={100} required />
            <Text size='1' color='gray'>
              {formData.header.length}/100
            </Text>
          </Box>

          <Box>
            <Text as='label' size='2' mb='1' weight='bold'>
              Content*
            </Text>
            <TextArea
              name='content'
              value={formData.content}
              onChange={handleChange}
              placeholder='Text (optional)'
              size='3'
              maxLength={280}
              required
            />
            <Text size='1' color='gray'>
              {formData.content.length}/280
            </Text>
          </Box>

          <Box>
            <Text as='label' size='2' mb='1' weight='bold'>
              Tags
            </Text>
            <Flex wrap='wrap' gap='2' mb='2'>
              {tags.map(tag => (
                <Badge
                  key={tag.name}
                  color={tag.color}
                  onClick={() => handleTagChange(tag.name)}
                  style={{
                    cursor: "pointer",
                    opacity: formData.tags.includes(tag.name) ? 1 : 0.6,
                    border: formData.tags.includes(tag.name) ? "1px solid currentColor" : "none",
                    padding: "6px 10px",
                  }}>
                  {tag.name}
                </Badge>
              ))}
            </Flex>
            <Text size='1' color='gray'>
              Click on tags to select/deselect (max 3 recommended)
            </Text>
          </Box>

          <Flex gap='3' mt='4' justify='end'>
            <Button type='button' variant='soft' onClick={() => router.push("/")} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting || !isConnected}>
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
