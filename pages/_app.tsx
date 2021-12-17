import "@/styles/globals.scss";
import * as Portal from "@radix-ui/react-portal";
import { IconContext } from "@react-icons/all-files/lib";
import AuthProvider from "context/auth";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { NextPageWithLayout } from "utils/types";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="theme-mode"
    >
      <DefaultSeo
        titleTemplate="%s | Flare"
        description="Flare is a place for coders to share their knowledge of technology and development."
        defaultTitle="Flare 💭"
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
