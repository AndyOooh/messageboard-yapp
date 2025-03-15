"use client";

import { Flex, Link } from "@radix-ui/themes";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { CustomConnectButton } from "./CustomConnectButton";
import { MdOutlineMenu, MdOutlineSearch } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import NextLink from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <Flex py='4' px='4' justify='between' align='center' gap='1' className='sticky top-0 z-50 bg-black/10 backdrop-blur-sm'>
      <Flex align='center' gap='2'>
        <MdOutlineMenu color='white' size={24} />

        <Link href='/'>
          <Image src='/AppKit.svg' alt='logo' width={32} height={32} className='rounded-full' />
        </Link>
      </Flex>
      <Flex gap='4' align='center' justify='center'>
        <MdOutlineSearch color='white' size={24} />
        <NextLink href='/create' passHref>
          <MdOutlinePostAdd color='white' size={24} className='cursor-pointer hover:opacity-80 transition-opacity' />
        </NextLink>
        <MdOutlineNotifications color='white' size={24} />

        {/* <Link href='https://github.com/yodlpay/yappkit' target='_blank'>
          <FaGithub />
        </Link>
        <Link href='https://x.com/yodlpay' target='_blank'>
          <FaTwitter color='white' size={24} />
        </Link> */}
        <CustomConnectButton />
      </Flex>
    </Flex>
  );
}
