import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "utils/types";
import { ThemeProvider } from "next-themes";
import { IconContext } from "@react-icons/all-files/lib";
import { IdProvider } from "@radix-ui/react-id";
import AuthProvider from "context/auth";
import { Toaster } from "react-hot-toast";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="nightwind-mode"
    >
      <IconContext.Provider value={{ className: "r-icon" }}>
        <IdProvider>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </IdProvider>
      </IconContext.Provider>
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
    </ThemeProvider>
  );
}

export default MyApp;
