import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query keys
export const commentKeys = {
  all: ["comments"] as const,
  byPost: (postId: number) => [...commentKeys.all, "post", postId] as const,
  detail: (id: number) => [...commentKeys.all, "detail", id] as const,
};

// API client functions
const commentApi = {
  getByPostId: async (postId: number, options?: { limit?: number; offset?: number }) => {
    const params = new URLSearchParams();
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.offset) params.append("offset", options.offset.toString());

    const response = await fetch(`/api/posts/${postId}/comments?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  },

  create: async (data: { content: string; creatorEns: string; postId: number }) => {
    const response = await fetch(`/api/posts/${data.postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: data.content,
        creatorEns: data.creatorEns,
      }),
    });
    if (!response.ok) throw new Error("Failed to create comment");
    return response.json();
  },
};

// Individual hooks for queries
export function useGetCommentsByPostId(postId: number | undefined, options?: Parameters<typeof commentApi.getByPostId>[1]) {
  return useQuery({
    queryKey: [...commentKeys.byPost(postId || 0), options],
    queryFn: () => commentApi.getByPostId(postId!, options),
    enabled: !!postId,
  });
}

// Hook for mutations
export function useCommentMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: commentApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byPost(variables.postId) });
    },
  });

  return {
    create,
    // Add other mutations as needed
  };
}
