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
    data: PostsJoins[];
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
        id,
        title,
        emoji,
        post_type,
        reading_time,
        published_at,
        slug,
        like_count,
        user:user_id (
          username, display_name, avatar_url
        )
        `,
        { count: "estimated" }
      )
      .match({
        user_id: res.data.id,
        published: true,
        post_type: "article",
      })
      .range(0, 23)
      .order("created_at", { ascending: false });

    return {
      props: {
        profile: res.data,
        articles: {
          data: (articlesRes.data as PostsJoins[]) ?? [],
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
  const profileTabItems = [
    {
      key: "article",
      displayName: `Articles ${articles.count}`,
      href: `/${profile.username}`,
    },
    {
      key: "notebook",
      displayName: "Notebooks",
      href: `/${profile.username}?tab=notebook`,
    },
  ];

  const activeTab = queryParamToString(router.query.tab, "article");

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
                  <h2 className="text-tMuted text-sm mt-1">
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
      <Container size="common">
        {activeTab === `article` ? (
          <UserArticles userId={profile.id} initialData={articles.data} />
        ) : null}
      </Container>
    </>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
