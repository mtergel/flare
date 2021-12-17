import { useAuth } from "context/auth";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import MinHeader from "ui/Layout/MinHeader";

const ArticleEditor = dynamic(() => import("ui/ArticleEditor/ArticleEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const NewArticle: NextPage = () => {
  const { user } = useAuth();
  return (
    <>
      <NextSeo noindex nofollow title="New Article" />
      {user && (
        <div className="h-full flex flex-col">
          <MinHeader />
          <div className="flex-grow pb-20">
            <ArticleEditor user_id={user.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default NewArticle;
