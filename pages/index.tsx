import Layout from "ui/Layout/Layout";
import { NextPageWithLayout } from "utils/types";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <p>Tsunami 🌊 </p>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
