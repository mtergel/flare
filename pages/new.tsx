import ArticleEditor from "@/components/Editor/ArticleEditor";
import Fallback from "@/components/Fallback/Fallback";
import { NextPageWithLayout } from "@/utils/types";
import { useAuth } from "context/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import MinHeader from "ui/Layout/MinHeader";

const NewArticleContainer: NextPageWithLayout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }

    // eslint-disable-next-line
  }, [user, loading]);

  if (user) {
    return <NewArticle />;
  } else {
    return <Fallback />;
  }
};

const NewArticle: React.FC<{}> = () => {
  return (
    <div className="h-full flex flex-col">
      <MinHeader />
      <div className="bg-paper flex-grow">
        <ArticleEditor />
      </div>
    </div>
  );
};

export default NewArticleContainer;
