import { Flex, Heading, Container, Box } from "@radix-ui/themes";
import { getAll } from "@/lib/services/post";
import PostList from "@/components/PostList";

export default async function Home() {
  // Fetch initial posts (first page)
  console.log("Fetching posts...");
  const initialPosts = await getAll({ limit: 10 });

  console.log("🚀 initialPosts length:", initialPosts?.length);
  console.log("🚀 initialPosts:", initialPosts);

  return (
    <main>
      <Container size='3' py='6'>
        <Heading size='8' mb='6'>
          Message Board
        </Heading>
        <PostList initialPosts={initialPosts || []} />
      </Container>
    </main>
  );
}
