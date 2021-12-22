module.exports = {
  siteUrl: process.env.SITE_URL || "https://flare-community.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml", "/user"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://flare-community.vercel.app/server-sitemap.xml", // <==== Add here
    ],
  },
};
