import { Flex, Link } from "@radix-ui/themes";
import { MdOutlinePostAdd } from "react-icons/md";
import NextLink from "next/link";
import Image from "next/image";
import { YodlButton } from "./YodlButton";
// import { MdOutlineMenu, MdOutlineSearc, MdOutlineNotifications } from "react-icons/md";

export function Header() {
  return (
    <Flex py='4' px='4' justify='between' align='center' gap='1' className='sticky top-0 z-50  backdrop-blur-xs'>
      <Flex align='center' gap='2'>
        <Link href='/'>
          <Image src='/AppKit.svg' alt='logo' width={32} height={32} className='rounded-full' />
        </Link>
      </Flex>
      <Flex gap='4' align='center' justify='center'>
        <NextLink href='/create' passHref>
          <MdOutlinePostAdd color='white' size={24} className='cursor-pointer hover:opacity-80 transition-opacity' />
        </NextLink>
        <YodlButton />
      </Flex>
    </Flex>
  );
}
