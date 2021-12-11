import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Container from "@/components/Container/Container";
import Tooltip from "@/components/Tooltip/Tooltip";
import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { FiHelpCircle } from "@react-icons/all-files/fi/FiHelpCircle";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import Layout from "ui/Layout/Layout";
import { NextPageWithLayout, PostsJoins } from "utils/types";

interface HomePageProps {
  articles: PostsJoins[];
}

const itemsPerPage = 24;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const articleRes = await supabase
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
        like_count,
        view_count,
        user:user_id (
          username, display_name, avatar_url
        )
      `
    )
    .match({
      published: true,
      post_type: "article",
    })
    .order("published_at", { ascending: false })
    .limit(itemsPerPage);

  let articles = [] as PostsJoins[];

  if (articleRes.data) {
    articles = (articleRes.data as PostsJoins[]).sort(
      (a, b) => a.view_count - b.view_count
    );
  }

  return {
    props: {
      articles,
    },
    revalidate: 3600,
  };
};

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> =
  (props) => {
    const { articles } = props;
    return (
      <>
        <Container size="common">
          <div className="py-12">
            <div className="flex items-center space-x-2 mb-4">
              <h1 className="text-4xl font-bold">Articles</h1>
              <Tooltip content={"Ordered by latest + view count"}>
                <div>
                  <FiHelpCircle className="text-tMuted" />
                </div>
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {articles.map((i) => (
                <ArticleCard key={i.id} article={i} />
              ))}
            </div>
          </div>
        </Container>
      </>
    );
  };

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
