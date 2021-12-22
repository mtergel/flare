export const pageview = (url: string) => {
  // @ts-expect-error
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};
