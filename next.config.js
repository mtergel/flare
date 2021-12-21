const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: "public",
      runtimeCaching,
    },
    reactStrictMode: true,
    images: {
      domains: ["anyqfjvtgmdymcwdoeac.supabase.in", "cdn.buymeacoffee.com"],
    },
  })
);
