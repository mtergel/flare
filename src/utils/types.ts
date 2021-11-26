import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { definitions } from "@/utils/generated";

/**
 * NextPage extended with getLayout function
 */
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type EditTag = {
  id?: string;
  value: string;
  label: string;
  __isNew__?: boolean;
};

export type MDHeading = {
  content: string;
  slug: string;
  lvl: 1 | 2 | 3 | 4 | 5 | 6;
  i: number;
  seen: number;
};

export interface SideMenuItem {
  link: string;
  title: string;
  icon: ReactNode;
}

export interface TocProps {
  headings: MDHeading[];
  /**
   * MDHeading.slug
   */
  activeId?: string;
}

export type ErrorCode = "NoProfile" | "NoUsername";

type Post = definitions["posts"];
export interface PostsJoins extends Post {
  tags: definitions["tags"][];
  user: definitions["profiles"];
}
