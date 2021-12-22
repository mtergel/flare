import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import { supabase } from "@/utils/supabaseClient";
import { definitions } from "@/utils/generated";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const res = await supabase
    .from<definitions["tags"]>("tags")
    .select(`id`)
    .eq("featured", true);

  let fields = (res.data ?? []).map(
    (i) =>
      ({
        loc: `https://flare-community.vercel.app/tags/${i.id}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
      } as ISitemapField)
  );

  fields.concat([
    {
      loc: `https://flare-community.vercel.app`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
    {
      loc: `https://flare-community.vercel.app/about`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
    {
      loc: `https://flare-community.vercel.app/enter`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
    {
      loc: `https://flare-community.vercel.app/faq`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
    {
      loc: `https://flare-community.vercel.app/privacy`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
    {
      loc: `https://flare-community.vercel.app/terms`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
    {
      loc: `https://flare-community.vercel.app/search`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
    },
  ]);

  return getServerSideSitemap(ctx, fields);
};

const dummy = () => {};

export default dummy;
