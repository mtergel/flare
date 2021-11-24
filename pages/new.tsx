import ArticleEditor from "ui/ArticleEditor/ArticleEditor";
import Fallback from "@/components/Fallback/Fallback";
import { NextPageWithLayout } from "@/utils/types";
import useProtected from "hooks/useProtected";
import MinHeader from "ui/Layout/MinHeader";

const NewArticleContainer: NextPageWithLayout = () => {
  const { user } = useProtected();

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
