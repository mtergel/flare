import Container from "@/components/Container/Container";
import { NextSeo } from "next-seo";
import Layout from "ui/Layout/Layout";
import { NextPageWithLayout } from "utils/types";

const FAQ: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="
Frequently Asked Questions"
        description="Frequently Asked Questions · What can you do with Flare?"
      />
      <Container size="common">
        <div className="my-12 bg-paper rounded-lg">
          <div className="space-y-4">
            <div className="border-b px-6 py-8">
              <h1 className="text-2xl font-bold text-center">
                Frequently Asked Questions
              </h1>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="h-6 w-6 font-bold text-white dark:text-paper bg-primary p-4 rounded-lg flex items-center justify-center">
                  Q
                </span>
                <span className="text-xl font-medium">
                  What can you do with Flare?
                </span>
              </div>
              <div>
                <p className="text-sm text-tMuted">
                  The main functions at the moment are as follows.
                </p>
                <ul className="mt-2 space-y-3">
                  <li>
                    <p className="mb-1 text-lg font-medium">Article</p>
                    <span className="text-sm text-tMuted">
                      You can write with markdown and publish it.
                    </span>
                  </li>
                  <li>
                    <p className="mb-1 text-lg font-medium">Scribbles</p>
                    <span className="text-sm text-tMuted">
                      It is a way to organize information in a thread format. It
                      can be used not only for recording development but also
                      for sharing info and exchanging opinions.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

FAQ.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default FAQ;
