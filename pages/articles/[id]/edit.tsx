import Fallback from "@/components/Fallback/Fallback";
import { queryParamToNumber } from "@/utils/query";
import { useAuth } from "context/auth";
import useGetArticle from "hooks/supabase-hooks/articles/useGetArticle";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import MinHeader from "ui/Layout/MinHeader";
import ErrorMessage from "ui/misc/ErrorMessage";

const ArticleEditor = dynamic(() => import("ui/ArticleEditor/ArticleEditor"), {
  ssr: false,
});

const EditWrapper: NextPage = () => {
  const { user } = useAuth();

  return (
    <>
      <NextSeo noindex nofollow title="Edit article" />
      {user && (
        <div className="h-full w-full flex flex-col">
          <MinHeader />
          <div className="flex-grow pb-20">
            <EditArticle uid={user.id} />
          </div>
        </div>
      )}
    </>
  );
};

const EditArticle: React.FC<{ uid: string }> = ({ uid }) => {
  const router = useRouter();
  const postId = queryParamToNumber(router.query.id, 0);
  const { data, isLoading, error } = useGetArticle(postId);

  if (isLoading) {
    return (
      <div className="pt-12">
        <Fallback />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  if (data) {
    const tags = data.tags.map((i) => ({
      id: i.id,
      label: i.tags_id,
      value: i.tags_id,
    }));
    return (
      <ArticleEditor
        user_id={uid}
        id={data.id}
        body_markdown={data.body_markdown}
        emoji={data.emoji}
        published={data.published}
        tag_keyword={tags}
        title={data.title}
      />
    );
  }

  return null;
};

export default EditWrapper;
