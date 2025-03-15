export * from "./chain";
import { BadgeProps } from "@radix-ui/themes/";

export const CONFIG = {
  YAPP_URL: process.env.NEXT_PUBLIC_YAPP_URL,
  YAPP_ENS_NAME: process.env.NEXT_PUBLIC_YAPP_ENS_NAME,
  YAPP_DOMAIN: process.env.NEXT_PUBLIC_YAPP_DOMAIN,
  PARENT_URL: process.env.NEXT_PUBLIC_PARENT_URL,
  INDEXER_URL: "https://tx.yodl.me/api/v1",
  IS_DEV: process.env.NODE_ENV === "development",
  DATABASE_URL: process.env.DATABASE_URL,
};

// export const accentColor = "teal";
export const accentColor = "iris";
export const accentGradient = "bg-gradient-to-r from-blue-500 to-purple-500";

type TagType = "announcement" | "vote" | "meme" | "news" | "first-post";

type Tag = {
  name: TagType;
  color: BadgeProps["color"];
};

export const tags: Tag[] = [
  {
    name: "announcement",
    color: "iris",
  },
  {
    name: "vote",
    color: "amber",
  },
  {
    name: "meme",
    color: "orange",
  },
  {
    name: "news",
    color: "pink",
  },
  {
    name: "first-post",
    color: "green",
  },
  ];
