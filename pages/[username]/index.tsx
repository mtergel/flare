import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout } from "@/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Layout from "ui/Layout/Layout";

type UserPageProps = {
  profile: definitions["profiles"];
};
// maybe change this to ISR later.
export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  context
) => {
  const params = context.params; // params.username

  const res = await supabase
    .from<definitions["profiles"]>("profiles")
    .select(`id, username, avatar_url, display_name, bio`)
    .eq("username", params!.username as string)
    .single();

  if (res.data) {
    return {
      props: {
        profile: res.data,
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
  const { profile } = props;
  const currentUser = supabase.auth.user();
  return (
    <>
      <header className="bg-paper border-t">
        <Container size="common">
          <div className="py-12">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                <Avatar
                  size="profile"
                  src={profile.avatar_url}
                  fallback={profile.display_name}
                />
                <div>
                  <h1 className="font-medium">{profile.display_name}</h1>
                  <h2 className="text-gray-400 text-sm">@{profile.username}</h2>
                  <p className="mt-2 text-sm">{profile.bio}</p>
                </div>
              </div>
              {profile.id === currentUser?.id ? (
                <Link href="/settings" passHref>
                  <Button as="a" variant="outline">
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
    </>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
