import ArticleEditor from "@/components/Editor/ArticleEditor";
import Fallback from "@/components/Fallback/Fallback";
import { useGetPostByIdQuery } from "graphql/generated/graphql";
import useProtected from "hooks/useProtected";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import MinHeader from "ui/Layout/MinHeader";
import ErrorMessage from "ui/misc/ErrorMessage";

// Maybe change to SSR
// TODO Bug with URQL client not applying auth exchange when you init a client
// in ssr. 🤷‍♂️
const EditWrapper: NextPage = () => {
  const { user } = useProtected();

  if (user) {
    return <EditArticle uid={user.uid} />;
  } else {
    return <Fallback />;
  }
};

const EditArticle: React.FC<{ uid: string }> = ({ uid }) => {
  const router = useRouter();
  const [res] = useGetPostByIdQuery({
    variables: {
      id: router.query.id as string,
    },
  });

  return (
    <div className="h-full flex flex-col">
      <MinHeader />
      <div className="bg-paper flex-grow">
        {res.fetching && <Fallback />}

        {res.error && <ErrorMessage text={res.error.message} />}

        {!res.fetching &&
          !res.error &&
          res.data &&
          res.data.posts_by_pk &&
          uid &&
          res.data.posts_by_pk.user_id === uid && (
            <ArticleEditor
              id={res.data.posts_by_pk.id}
              body_markdown={res.data.posts_by_pk.body_markdown}
              emoji={res.data.posts_by_pk.emoji}
              published={res.data.posts_by_pk.published}
              tag_keyword={res.data.posts_by_pk.posts_tags.map((i) => ({
                id: i.id,
                label: i.tag_keyword,
                value: i.tag_keyword,
              }))}
              title={res.data.posts_by_pk.title}
            />
          )}
      </div>
    </div>
  );
};

export default EditWrapper;
