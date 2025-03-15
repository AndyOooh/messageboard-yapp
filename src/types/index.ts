import { CHAINID_TO_VIEM_CHAIN } from "@/constants";
import { Post, Vote, Comment } from "@prisma/client";

export type SupportedChainId = keyof typeof CHAINID_TO_VIEM_CHAIN;

export type PostExtended = Post & {
  _count?: {
    comments: number;
  };
  votes?: Vote[];
  comments?: Comment[];
};
