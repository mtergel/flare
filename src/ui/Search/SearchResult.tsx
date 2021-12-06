import LinkTabs from "@/components/LinkTabs/LinkTabs";
import { definitions } from "@/utils/generated";
import { queryParamToNumber, queryParamToString } from "@/utils/query";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { LinkTab, SearchResultType } from "utils/types";
import SearchResultArticles from "./SearchResultArticles";
import SearchResultUser from "./SearchResultUser";

enum SearchResultsTabKey {
  article = "article",
  users = "users",
}

const SearchResult: React.FC<{ param: string }> = ({ param }) => {
  const [data, setData] = useState<SearchResultType | null>(null);

  const router = useRouter();
  let searchTabItems: LinkTab[] = [];

  let activeTab = queryParamToString(
    router.query.source,
    SearchResultsTabKey.article
  );

  const getCountAll = async (input: string) => {
    const postRes = supabase
      .from<definitions["posts"]>("posts")
      .select(
        `
        id
        `,
        {
          count: "estimated",
        }
      )
      .match({
        published: true,
        post_type: "article",
      })
      .ilike("title", `%${input}%`)
      .limit(1);

    const profileRes = supabase
      .from<definitions["profiles"]>("profiles")
      .select(
        `
            id
        `,
        {
          count: "estimated",
        }
      )
      .ilike("username", `%${input}%`)
      .limit(1);

    const res = await Promise.all([postRes as any, profileRes]);
    setData({
      articleCount: res[0].count ?? 0,
      userCount: res[1].count ?? 0,
    });
  };

  useEffect(() => {
    getCountAll(param);
  }, [param]);

  if (data) {
    // reset value if value other than enum value is given
    if (
      !Object.values(SearchResultsTabKey).includes(
        activeTab as SearchResultsTabKey
      )
    ) {
      activeTab = SearchResultsTabKey.article;
    }

    if (data.articleCount > 0) {
      searchTabItems.push({
        key: SearchResultsTabKey.article,
        displayName: `Articles ${data.articleCount}`,
        href: `/search?param=${param}`,
      });
    }

    if (data.userCount > 0) {
      searchTabItems.push({
        key: SearchResultsTabKey.users,
        displayName: `Users ${data.userCount}`,
        href: `/search?param=${param}&source=${SearchResultsTabKey.users}`,
      });
    }

    if (searchTabItems.length === 1) {
      activeTab = searchTabItems[0].key;
    }

    return (
      <>
        <LinkTabs
          active={activeTab}
          items={searchTabItems}
          listAriaLabel="profile sections"
        />

        {activeTab === SearchResultsTabKey.article && (
          <div className="space-y-4 pt-4">
            <SearchResultArticles param={param} count={data.articleCount} />
          </div>
        )}

        {activeTab === SearchResultsTabKey.users && (
          <div className="pt-4">
            <SearchResultUser param={param} count={data.userCount} />
          </div>
        )}
      </>
    );
  }

  return null;
};

export default SearchResult;
