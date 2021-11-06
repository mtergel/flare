import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "types";
import { ThemeProvider } from "next-themes";
import { IconContext } from "@react-icons/all-files/lib";
import { IdProvider } from "@radix-ui/react-id";
import AuthProvider from "context/auth";
import { Provider } from "urql";
import client from "urqlClient";

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
          <Provider value={client}>
            <AuthProvider>
              {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
          </Provider>
        </IdProvider>
      </IconContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
