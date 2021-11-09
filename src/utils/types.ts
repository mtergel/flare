import { NextComponentType, NextPage } from "next";
import { NextUrqlContext, WithUrqlProps } from "next-urql";
import { ReactElement, ReactNode } from "react";

/**
 * NextPage extended with getLayout function
 */
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type NextComponentTypeWithLayout = NextComponentType<
  NextUrqlContext,
  {},
  WithUrqlProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
