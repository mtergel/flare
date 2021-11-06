import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "types";
import { ThemeProvider } from "next-themes";
import { IconContext } from "@react-icons/all-files/lib";

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
        {getLayout(<Component {...pageProps} />)}
      </IconContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
