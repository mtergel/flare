import { NextPageWithLayout } from "@/utils/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "ui/Layout/Layout";

type ScribblePageProps = {};

export const getServerSideProps: GetServerSideProps<ScribblePageProps> = async (
  context
) => {
  const params = context.params; // params.slug

  console.log(params!.slug);

  return {
    props: {},
  };
};

const ScribblePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const {} = props;

  return <div>hello</div>;
};

ScribblePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ScribblePage;
