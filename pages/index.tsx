import ArticleEditor from "@/components/Editor/ArticleEditor";
import Layout from "ui/Layout/Layout";
import { NextPageWithLayout } from "utils/types";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto py-4">
        <ArticleEditor />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
