import ArticleEditor from "@/components/Editor/ArticleEditor";
import MinHeader from "ui/Layout/MinHeader";

const NewArticle: React.FC<{}> = () => {
  return (
    <>
      <MinHeader />
      <ArticleEditor />
    </>
  );
};

export default NewArticle;
