"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, Text, TextField, TextArea, Badge } from "@radix-ui/themes";
import { useToast } from "@/providers/ToastProvider";
import { CONFIG, tags } from "@/constants";
import { useToken } from "@/providers/TokenProviders";
import { sdk } from "@/lib/sdk";
import { usePostMutations } from "@/hooks/usePosts";
import { PaymentSimple } from "@/types";
import { Address, isAddressEqual } from "viem";

export default function CreatePostPage() {
  const router = useRouter();
  const { tokenInfo } = useToken();
  const toast = useToast();
  const [paymentStatus, setPaymentStatus] = useState<"submitting" | "verifying" | null>(null);
  const [formData, setFormData] = useState({
    header: "",
    content: "",
    tags: [] as string[],
  });

  const { create, update } = usePostMutations();

  if (!tokenInfo) {
    return <div>Loading...</div>; // Should say "Please connect through the Yodl super app to create a post"
  }

  const getPayment = async (txHash: string): Promise<PaymentSimple> => {
    const INDEXER_URL = "https://tx.yodl.me/api/v1";
    const response = await fetch(`${INDEXER_URL}/payments/${txHash}`);
    const data = await response.json();
    return data.payment;
  };

  const validatePayment = (payment: PaymentSimple) => {
    if (payment.receiverEnsPrimaryName !== tokenInfo.iss) throw new Error("Verfication failed: Receiver ENS does not match");
    if (!isAddressEqual(payment.receiverAddress as Address, CONFIG.COMMUNITY_ADDRESS))
      throw new Error("Verfication failed: Receiver address does not match");
    if (Number(payment.invoiceAmount) < CONFIG.POST_FEE.amount) throw new Error("Verfication failed: Amount is too small");
    if (payment.invoiceCurrency !== CONFIG.POST_FEE.currency) throw new Error(`Verfication failed: Currency must be ${CONFIG.POST_FEE.currency}`);
    // if (payment.memo !== postId) throw new Error("Memo does not match") // memo not available in PaymentSimple.
  };

  const isFormValid = () => {
    return formData.header.trim() && formData.content.trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tagName: string) => {
    setFormData(prev => {
      if (prev.tags.includes(tagName)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tagName) };
      } else {
        return { ...prev, tags: [...prev.tags, tagName] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setPaymentStatus("submitting");

      // Step 1: Create the initial post (without txHash, paid=false)
      const postData = {
        creatorEns: tokenInfo.ens || "",
        header: formData.header,
        content: formData.content,
        tags: formData.tags,
        paid: false,
      };
      const newPost = await create.mutateAsync(postData);

      // Step 2: Request payment with the post ID
      const { txHash } = await sdk.requestPayment(CONFIG.COMMUNITY_ADDRESS, {
        amount: CONFIG.POST_FEE.amount,
        currency: CONFIG.POST_FEE.currency,
        memo: newPost.id.toString(),
      });
      setPaymentStatus("verifying");

      const indexedPayment = await getPayment(txHash);
      console.log("🚀 indexedPayment:", indexedPayment);

      validatePayment(indexedPayment);

      // Step 4: Update the post with the transaction hash and paid status
      // TODO: Should we conditionally update/delete the post if payment fails?
      await update.mutateAsync({
        id: newPost.id,
        data: {
          txHash,
          paid: true,
        },
      });

      toast.success("Post created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create post. Please try again.";
      toast.error(errorMessage);
    } finally {
      setPaymentStatus(null);
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
            <TextArea name='content' value={formData.content} onChange={handleChange} placeholder='Text' size='3' maxLength={280} required />
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
                  size='2'
                  onClick={() => handleTagChange(tag.name)}
                  className={formData.tags.includes(tag.name) ? "border" : "border border-transparent opacity-60"}>
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          </Box>

          <Flex direction='column' gap='2' mt='4'>
            <Flex gap='3' justify='end'>
              <Button type='button' variant='soft' onClick={() => router.push("/")} disabled={paymentStatus !== null}>
                Cancel
              </Button>
              <Button type='submit' disabled={paymentStatus !== null || !isFormValid()}>
                {paymentStatus === "submitting" ? "Subimitting..." : paymentStatus === "verifying" ? "Verifying..." : "Create Post"}
              </Button>
            </Flex>
            <Text size='1' color='gray' align='right'>
              {`Posting fee: ${CONFIG.POST_FEE.amount} ${CONFIG.POST_FEE.currency}`}
            </Text>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
