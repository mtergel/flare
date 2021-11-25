// import Avatar from "@/components/Avatar/Avatar";
// import Button from "@/components/Button/Button";
// import Container from "@/components/Container/Container";
// import { useAuth } from "context/auth";
// import {
//   PublicGetUserByUsernameDocument,
//   PublicGetUserByUsernameQuery,
//   PublicGetUserByUsernameQueryVariables,
//   usePublicGetUserByUsernameQuery,
// } from "graphql/generated/graphql";
// import { GetServerSideProps } from "next";
// import { initUrqlClient, withUrqlClient } from "next-urql";
// import { useRouter } from "next/dist/client/router";
// import Layout from "ui/Layout/Layout";
// import ErrorMessage from "ui/misc/ErrorMessage";
// import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
// import { NextComponentTypeWithLayout, NextPageWithLayout } from "utils/types";

import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import { NextPageWithLayout } from "@/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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
    .select(`id, username, avatar_url, display_name`)
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
  return <h1>Pog {profile.display_name}</h1>;
};
// const Profile: NextPageWithLayout = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth();
//   const [res] = usePublicGetUserByUsernameQuery({
//     variables: {
//       _eq: router.query.username as string,
//     },
//   });

//   if (res.data && res.data.users.length > 0) {
//     const data = res.data.users[0];
//     const handleEdit = () => {
//       router.push("/settings");
//     };
//     return (
//       <>
//         <header className="bg-paper">
//           <Container size="common">
//             <div className="py-12">
//               <div className="flex items-start justify-between">
//                 <div className="flex flex-col gap-2 md:flex-row md:gap-6">
//                   <Avatar
//                     size="profile"
//                     src={data.image || undefined}
//                     fallback={data.name[0]}
//                   />
//                   <div>
//                     <h1 className="font-medium">{data.name}</h1>
//                     <h2 className="text-gray-400 text-sm">@{data.username}</h2>
//                     <p className="mt-2">{data.bio}</p>
//                   </div>
//                 </div>
//                 {!loading &&
//                   (data.user_id === user?.uid ? (
//                     <Button onClick={handleEdit} variant="outline">
//                       Edit profile
//                     </Button>
//                   ) : (
//                     <Button color="primary">Follow</Button>
//                   ))}
//               </div>
//             </div>
//           </Container>
//         </header>
//       </>
//     );
//   } else {
//     return (
//       <div className="py-6">
//         <ErrorMessage text={res.error?.message} />
//       </div>
//     );
//   }
// };

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
