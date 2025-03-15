import { Container, Flex } from "@radix-ui/themes";
import { Header } from "./Header";
import { GrainyFilter } from "./GrainyFilter";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className='blob-cont'>
        <div className='light-purple blob'></div>
        <div className='deep-purple blob'></div>
      </div>
      <GrainyFilter />
      <Header />
      <Container size='1' mt='4'>
        <Flex direction='column' minHeight='100vh'>
          <main className='mb-16 px-4'>{children}</main>
        </Flex>
      </Container>
      {/* <Box px='4' position='fixed' bottom='0' left='0' right='0' className='bg-black/10 backdrop-blur-sm'>
        <Navigation />
      </Box> */}
    </>
  );
}
