import { Avatar } from "@radix-ui/themes";
import { Flex, Text } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import { getEnsOrTruncatedAddress } from "@/lib/utils";
import { Comment } from "@prisma/client";

export const CommentCard = (comment: Comment) => {
  return (
    <Flex gap='3'>
      <Avatar fallback={comment.creatorEns.substring(0, 2)} size='1' radius='full' className='h-4 w-4' />
      <Flex direction='column' gap='1'>
        <Flex justify='between' align='center' gap='2'>
          <Flex align='center' gap='2'>
            <Text size='1' weight='bold'>
              {getEnsOrTruncatedAddress(comment.creatorEns)}
            </Text>
          </Flex>
          <Text size='1' color='gray'>
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </Text>
        </Flex>
        <Text size='2'>{comment.content}</Text>
      </Flex>
    </Flex>
  );
};
