import { accentColor } from "@/constants";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <>
                    <button
                      onClick={openConnectModal}
                      type='button'
                      className='py-1 px-2 rounded-md border-2 [border-image:linear-gradient(to_right,var(--light-purple),var(--deep-purple))_1]'>
                      <Text size='3' className='font-bold'>
                        Connect
                      </Text>
                    </button>
                  </>
                );
              }
              if (chain?.unsupported) {
                return (
                  <button onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                );
              }
              return (
                <Flex gap='2' align='center' className='border border-[var(--light-purple)] rounded-md' py='1' px='2'>
                  <Button onClick={openChainModal} variant='ghost'>
                    {chain?.iconUrl ? <Image src={chain.iconUrl} alt={chain.name ?? "Chain icon"} width={24} height={24} /> : <GearIcon />}
                  </Button>
                  <Separator orientation='vertical' color={accentColor} />
                  <Button onClick={openAccountModal} variant='ghost'>
                    {account.ensAvatar ? (
                      <Image src={account.ensAvatar} alt={account.displayName ?? "Account avatar"} width={24} height={24} />
                    ) : (
                      <PersonIcon className='h-6 w-6' />
                    )}
                  </Button>
                </Flex>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
