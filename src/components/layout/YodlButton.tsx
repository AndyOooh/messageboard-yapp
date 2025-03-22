"use client";

import { useToken } from "@/providers/TokenProviders";
import { Code, DropdownMenu, Flex, IconButton, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import { MdOutlinePersonOff, MdOutlinePersonOutline } from "react-icons/md";
import { FaTwitter, FaGithub } from "react-icons/fa";

const socials = [
  {
    // label: "GitHub",
    label: "yodlpay/messageboard-yapp",
    href: "https://github.com/yodlpay/yappkit",
    icon: FaGithub,
  },
  {
    // label: "Twitter",
    label: "@yodlpay",
    href: "https://x.com/yodlpay",
    icon: FaTwitter,
  },
];

export const YodlButton = () => {
  const { isLoading, tokenInfo } = useToken();

  const ensAvatar = null;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size='3' variant='soft' radius='full'>
          {tokenInfo ? (
            ensAvatar ? (
              <Image src={ensAvatar} alt='Account avatar' width={24} height={24} />
            ) : (
              <MdOutlinePersonOutline />
            )
          ) : (
            <MdOutlinePersonOff />
          )}
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {tokenInfo ? (
          <>
            <DropdownMenu.Label>Token</DropdownMenu.Label>

            <DropdownMenu.Item>
              Community (iss):
              <Code>{tokenInfo.iss}</Code>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Address (sub):
              <Code>
                {tokenInfo.sub.slice(0, 4)}...{tokenInfo.sub.slice(-4)}
              </Code>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              ENS (ens):
              <Code>{tokenInfo.ens}</Code>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              App (aud):
              <Code>{tokenInfo.aud}</Code>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Expires (exp):
              <Code>{new Date(tokenInfo.exp * 1000).toLocaleString()}</Code>
            </DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Label>Connect</DropdownMenu.Label>
            {socials.map(social => (
              <DropdownMenu.Item key={social.label}>
                <Link href={social.href} target='_blank'>
                  <Flex align='center' gap='2'>
                    <social.icon size={16} />
                    <Text>{social.label}</Text>
                  </Flex>
                </Link>
              </DropdownMenu.Item>
            ))}
          </>
        ) : (
          <DropdownMenu.Item>Please open the YAPP through the Yodl super app.</DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
