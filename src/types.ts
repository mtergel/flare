import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

/**
 * NextPage extended with getLayout function
 */
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
