import Avatar from "@/components/Avatar/Avatar";
import Container from "@/components/Container/Container";
import LinkTabs from "@/components/LinkTabs/LinkTabs";
import { postUserFields } from "@/utils/const";
import { definitions } from "@/utils/generated";
import { queryParamToString } from "@/utils/query";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout, PostsJoins } from "@/utils/types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";
import Layout from "ui/Layout/Layout";
import TagArticles from "ui/Tag/TagArticles";

export const getStaticPaths: GetStaticPaths = async (context) => {
  const res = await supabase
    .from<definitions["tags"]>("tags")
    .select(`id`)
    .eq("featured", true);

  let paths = [] as (
    | string
    | {
        params: ParsedUrlQuery;
        locale?: string | undefined;
      }
  )[];

  if (res.data) {
    paths = res.data.map((i) => ({
      params: {
        tagId: i.id,
      },
    }));
  }

  return {
    paths,
    fallback: "blocking",
  };
};

type TagPageProps = {
  tag: definitions["tags"];
  articles: {
    count: number;
    data: PostsJoins[];
  };
};

// no need for page param here it will static rerender
export const getStaticProps: GetStaticProps<TagPageProps> = async (context) => {
  const params = context.params;
  const res = await supabase
    .from<definitions["tags"]>("tags")
    .select(
      `
        *
      `
    )
    .eq("id", params!.tagId as string)
    .single();

  if (res.data) {
    // fetch articles and get count
    const articlesRes = await supabase
      .from("posts")
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
        like_count,
        user:user_id (
          ${postUserFields}
        ),
        tags!inner(id)
      `,
        // this is giving the wrong count
        { count: "estimated" }
      )
      .eq("tags.id", res.data.id)
      .match({
        published: true,
        post_type: "article",
      })
      .range(0, 23)
      .order("published_at", { ascending: false });

    // fetch scribbles and get count
    // TODO

    return {
      props: {
        tag: res.data,
        articles: {
          count: articlesRes.count ?? 0,
          data: (articlesRes.data as PostsJoins[] | null) ?? [],
        },
        // articles: {
        //   count: articlesRes.count ?? 0,
        //   data: articleJoins,
        // },
      },
      revalidate: 3600,
    };
  }

  return {
    notFound: true,
  };
};

const TagPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { tag, articles } = props;
  const router = useRouter();
  const profileTabItems = [
    {
      key: "article",
      displayName: `Articles`,
      href: `/${tag.id}`,
    },
    {
      key: "scribbles",
      displayName: "Scribbles",
      href: `/${tag.id}?tab=scribbles`,
    },
  ];

  const activeTab = queryParamToString(router.query.tab, "article");

  return (
    <>
      <NextSeo
        title={tag.name}
        description={`Articles · ${articles.data
          .slice(0, 5)
          .map((i) => i.title)
          .join(" · ")}`}
      />
      <header className="bg-paper border-t">
        <Container size="common">
          <div className="py-12">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 sm:items-center">
                <Avatar
                  size="profile"
                  src={tag.image_url}
                  fallback={tag.name}
                />
                <div className="mt-3 pl-3 sm:pl-0 sm:mt-0">
                  <h1 className="font-bold text-2xl">{tag.name}</h1>
                  <div className="mt-3">
                    <p className="text-sm text-tMuted">
                      Tag your posts with{" "}
                      <span className="gray-bg py-1 px-2 rounded-lg">
                        {tag.id}
                      </span>{" "}
                      to show your articles here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <div className="bg-paper">
        <Container size="common" className="bg-paper">
          <LinkTabs
            active={activeTab}
            items={profileTabItems}
            listAriaLabel="profile sections"
          />
        </Container>
      </div>
      <Container size="common">
        {activeTab === `article` ? (
          <TagArticles tagId={tag.id} initialData={articles.data} />
        ) : null}
      </Container>
    </>
  );
};

TagPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TagPage;
