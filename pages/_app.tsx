import "@/styles/globals.scss";
import * as Portal from "@radix-ui/react-portal";
import { IconContext } from "@react-icons/all-files/lib";
import AuthProvider from "context/auth";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { NextPageWithLayout } from "utils/types";
import dynamic from "next/dynamic";
import { pageview } from "@/utils/ga";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TopProgressBar = dynamic(
  () => import("ui/TopProgressBar/TopProgressBar"),
  {
    ssr: false,
  }
);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="theme-mode"
    >
      <TopProgressBar />
      <DefaultSeo
        titleTemplate="%s | Flare"
        description="Flare is a place for coders to share their knowledge of technology and development."
        defaultTitle="Flare 💭"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://flare-community.vercel.app",
          title: "Flare 💭",
          description:
            "Flare is a place for coders to share their knowledge of technology and development.",
          images: [
            {
              url: "https://flare-community.vercel.app/logo-dark.png",
              width: 632,
              height: 632,
              alt: "Flare logo dark",
            },
          ],
          site_name: "Flare 💭",
        }}
      />
      <IconContext.Provider value={{ className: "r-icon" }}>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </IconContext.Provider>
      <Portal.Root>
        <Toaster
          toastOptions={{
            position: "bottom-right",
            className: "toastOverride",
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "white",
              },
            },
          }}
        />
      </Portal.Root>
    </ThemeProvider>
  );
}

export default MyApp;
