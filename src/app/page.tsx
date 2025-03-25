import { Heading, Container, Text } from '@radix-ui/themes';
import { getAll } from '@/lib/services/post';
import PostList from '@/components/PostList';

export default async function Home() {
  const initialPosts = await getAll({ limit: 10 });

  return (
    <main>
      <Container size="3" mt="4">
        <Heading size="6">Yodlboard</Heading>
        <Text as="p" mb="3" color="gray">
          Decentralized community message board
        </Text>
        <PostList initialPosts={initialPosts || []} />
      </Container>
    </main>
  );
}

export const revalidate = 30;
