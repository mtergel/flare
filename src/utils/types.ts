import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
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

type Merge<T, U> = Omit<T, keyof U> & U;
type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

// https://github.com/kripod/react-polymorphic-types/blob/main/index.d.ts
export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithRef<T>,
  PropsWithAs<P, T>
>;

type PolymorphicExoticComponent<
  P = {},
  T extends React.ElementType = React.ElementType
> = Merge<
  React.ExoticComponent<P & { [key: string]: unknown }>,
  {
    /**
     * **NOTE**: Exotic components are not callable.
     */
    <InstanceT extends React.ElementType = T>(
      props: PolymorphicPropsWithRef<P, InstanceT>
    ): React.ReactElement | null;
  }
>;

export type PolymorphicForwardRefExoticComponent<
  P,
  T extends React.ElementType
> = Merge<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<P, T>
>;
