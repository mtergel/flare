import Fallback from "@/components/Fallback/Fallback";
import { useAuth } from "context/auth";
import { NextPage } from "next";
import ArticleEditor from "ui/ArticleEditor/ArticleEditor";
import MinHeader from "ui/Layout/MinHeader";

const NewArticle: NextPage = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Fallback />;
  }

  if (user) {
    return (
      <div className="h-full flex flex-col">
        <MinHeader />
        <div className="flex-grow bg-paper pb-20">
          <ArticleEditor />
        </div>
      </div>
    );
  }

  return null;
};

export default NewArticle;
