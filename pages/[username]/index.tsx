import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import LinkTabs from "@/components/LinkTabs/LinkTabs";
import { definitions } from "@/utils/generated";
import { queryParamToString } from "@/utils/query";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout, PostsJoins } from "@/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Layout from "ui/Layout/Layout";
import UserArticles from "ui/Profile/UserArticles";

type UserPageProps = {
  profile: definitions["profiles"];
  articles: {
    articles: PostsJoins[];
    count: number;
  };
};

// maybe change this to ISR later.
export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  context
) => {
  const params = context.params; // params.username
  const client = supabase;

  const res = await client
    .from<definitions["profiles"]>("profiles")
    .select(`id, username, avatar_url, display_name, bio`)
    .eq("username", params!.username as string)
    .single();

  if (res.data) {
    const articlesRes = await client
      .from<definitions["posts"]>("posts")
      .select(
        `
        *,
        tags!post_tag (*),
        user:user_id (*)
        `,
        { count: "estimated" }
      )
      .match({
        user_id: res.data.id,
      })
      .range(0, 23)
      .order("created_at", { ascending: false });

    console.log(articlesRes);

    return {
      props: {
        profile: res.data,
        articles: {
          articles: (articlesRes.data as PostsJoins[]) ?? [],
          count: articlesRes.count ?? 0,
        },
      },
    };
  }
  return {
    notFound: true,
  };
};

const Profile: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { profile, articles } = props;
  const currentUser = supabase.auth.user();
  const router = useRouter();
  // console.warn(articles);
  const profileTabItems = [
    {
      displayName: `Articles ${articles.count}`,
      href: `/${profile.username}`,
    },
    {
      displayName: "Notebooks",
      href: `/${profile.username}?tab=notebook`,
    },
  ];

  const activeTab =
    queryParamToString(router.query.tab, "article") === "article"
      ? `/${profile.username}`
      : `/${profile.username}?tab=notebook`;

  return (
    <>
      <header className="bg-paper border-t">
        <Container size="common">
          <div className="py-12">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <Avatar
                  size="profile"
                  src={profile.avatar_url}
                  fallback={profile.display_name}
                />
                <div className="mt-3 sm:mt-0">
                  <h1 className="font-bold text-xl">{profile.display_name}</h1>
                  <h2 className="text-gray-400 text-sm mt-1">
                    @{profile.username}
                  </h2>
                  <div className="mt-3">
                    <p className="text-sm">{profile.bio}</p>
                  </div>
                </div>
              </div>
              {profile.id === currentUser?.id ? (
                <Link href="/user/settings" passHref>
                  <Button as="a" variant="outline" size="sm">
                    Edit profile
                  </Button>
                </Link>
              ) : (
                <Button color="primary">Follow</Button>
              )}
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
      {/* <Container size="common">
        {activeTab === `/${profile.username}` ? (
          <UserArticles userId={profile.id} initialData={articles.articles} />
        ) : null}
      </Container> */}
    </>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
