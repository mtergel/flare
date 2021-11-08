import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "utils/types";
import { ThemeProvider } from "next-themes";
import { IconContext } from "@react-icons/all-files/lib";
import { IdProvider } from "@radix-ui/react-id";
import AuthProvider from "context/auth";
import { Provider } from "urql";
import client from "urqlClient";
import { Toaster } from "react-hot-toast";
import Layout from "ui/Layout/Layout";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  let getLayout = Component.getLayout ?? ((page) => page);

  if (Component.displayName === "withUrqlClient(Profile)") {
    getLayout = function getLayout(page) {
      return <Layout>{page}</Layout>;
    };
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="nightwind-mode"
    >
      <IconContext.Provider value={{ className: "r-icon" }}>
        <IdProvider>
          <Provider value={client}>
            <AuthProvider>
              {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
          </Provider>
        </IdProvider>
      </IconContext.Provider>
      <Toaster
        toastOptions={{
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
