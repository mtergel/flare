import "@/styles/globals.scss";
import { IdProvider } from "@radix-ui/react-id";
import { IconContext } from "@react-icons/all-files/lib";
import AuthProvider from "context/auth";
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
