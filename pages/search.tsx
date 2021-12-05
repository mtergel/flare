import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Tag from "@/components/ArticleCard/Tag";
import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import { definitions } from "@/utils/generated";
import { queryParamToString } from "@/utils/query";
import { supabase } from "@/utils/supabaseClient";
import useFeaturedTags from "hooks/useFeaturedTags";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "ui/Layout/Layout";
import SearchField from "ui/Search/SearchField";
import { NextPageWithLayout, SearchResultType } from "utils/types";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const param = queryParamToString(router.query.param, "");

  return (
    <div className="bg-paper h-full">
      <Container size="common">
        <div className="py-12">
          <SearchField defaultValue={param} />
          <div className="pt-12">
            {param === "" ? <EmptyParamPage /> : <SearchResult param={param} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

const EmptyParamPage: React.FC<{}> = () => {
  const { fetching, options } = useFeaturedTags();

  if (fetching) {
    return (
      <div>
        <Fallback />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {options.items.map((i) => (
        <Link key={i.id} href={`/tag/${i.id}`} passHref>
          <a className="transition-colors hover:bg-gray-100 p-4 flex flex-col items-center justify-center space-y-2 border rounded-xl">
            <Image
              className="rounded-full border"
              width={40}
              height={40}
              alt={i.name}
              src={i.image_url}
            />
            <p className="text-sm line-clamp-1">{i.name}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

const SearchResult: React.FC<{ param: string }> = ({ param }) => {
  const [data, setData] = useState<SearchResultType | null>(null);

  const searchAll = async (input: string) => {
    const tagRes = supabase
      .from<definitions["tags"]>("tags")
      .select(`id, name, image_url`)
      .ilike("id", `%${input}%`)
      .limit(5);

    const postRes = supabase
      .from<definitions["posts"]>("posts")
      .select(
        `
        id,
        title,
        emoji,
        post_type,
        reading_time,
        published,
        published_at,
        slug,
        user:user_id (
          username, display_name, avatar_url
        ),
        tags!inner(id)
        `
      )
      .match({
        published: true,
        post_type: "article",
      })
      //   add pg_trgp
      .ilike("title", `%${input}%`)
      .limit(10);

    const profileRes = supabase
      .from<definitions["profiles"]>("profiles")
      .select(
        `
            id,
            username,
            display_name,
            avatar_url
    `
      )
      .textSearch("username", `${input}`)
      .limit(5);

    const res = await Promise.all([tagRes, postRes as any, profileRes]);
    setData(res);
  };

  useEffect(() => {
    searchAll(param);
  }, [param]);

  if (data) {
    //   TODO
    console.log(data);

    return (
      <div>
        {/* tags */}
        {data[0].data && (
          <div className="flex items-center flex-wrap gap-2">
            {data[0].data.map((i) => (
              <Tag tag={i} key={i.id} />
            ))}
          </div>
        )}
        {/* articles */}
        {data[1].data && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {data[1].data.map((i) => (
              <ArticleCard key={i.id} article={i} emojiClass="bg-gray-200" />
            ))}
          </div>
        )}

        {/* users */}
        {data[2].data && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {data[2].data.map((i) => (
              <div key={i.id}>
                <div>{i.display_name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

SearchPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
