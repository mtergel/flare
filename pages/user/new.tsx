import { useAuth } from "context/auth";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import MinHeader from "ui/Layout/MinHeader";

const ArticleEditor = dynamic(() => import("ui/ArticleEditor/ArticleEditor"), {
  ssr: false,
});

const NewArticle: NextPage = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="h-full flex flex-col">
        <MinHeader />
        <div className="flex-grow pb-20">
          <ArticleEditor user_id={user.id} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default NewArticle;
