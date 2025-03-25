export const dynamic = 'force-dynamic';

import { Heading, Container, Text } from '@radix-ui/themes';
import { getAll } from '@/lib/services/post';
import PostList from '@/components/PostList';
import { BOARD_TITLE } from '@/constants';

export default async function Home() {
  const initialPosts = await getAll({ limit: 10 });

  return (
    <main>
      <Container size="3" mt="4">
        <Heading size="6">{BOARD_TITLE}</Heading>
        <Text as="p" mb="3" color="gray">
          Decentralized community message board
        </Text>
        <PostList initialPosts={initialPosts || []} />
      </Container>
    </main>
  );
}
