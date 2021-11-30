import Fallback from "@/components/Fallback/Fallback";
import { NextPageWithLayout } from "@/utils/types";
import { useRouter } from "next/dist/client/router";
import { getDisplayName } from "next/dist/shared/lib/utils";
import React, { ComponentType, useEffect } from "react";
import { useAuth } from "./auth";

function withAuth<P extends object>(AppOrPage: ComponentType<P>) {
  const ComponentWithAuthRedirect: NextPageWithLayout<P> = (props: P) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!user && !loading) {
        // if finished loading and still no user
        // redirect to enter page (login page)
        router.push(`/enter?redirect=${router.pathname}`);
      }

      // eslint-disable-next-line
    }, [loading, user]);

    if (loading) {
      return <Fallback />;
    }

    if (user) {
      return <AppOrPage {...props} />;
    }

    return null;
  };

  // add layout if AppOrPage is NextPageWithLayout
  if ((AppOrPage as NextPageWithLayout).getLayout) {
    ComponentWithAuthRedirect.getLayout = (
      AppOrPage as NextPageWithLayout
    ).getLayout;
  }

  ComponentWithAuthRedirect.displayName = `WithAuth(${getDisplayName(
    AppOrPage
  )})`;
  return ComponentWithAuthRedirect;
}

export default withAuth;
