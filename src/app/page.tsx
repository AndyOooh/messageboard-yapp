import { Heading, Container } from "@radix-ui/themes";
import { getAll } from "@/lib/services/post";
import PostList from "@/components/PostList";

export default async function Home() {
  const initialPosts = await getAll({ limit: 10 });

  return (
    <main>
      <Container size='3' mt='4'>
        <Heading size='5' mb='4'>
          Recent Posts
        </Heading>
        <PostList initialPosts={initialPosts || []} />
      </Container>
    </main>
  );
}

export const revalidate = 30;
