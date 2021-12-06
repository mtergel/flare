import Container from "@/components/Container/Container";
import { queryParamToString } from "@/utils/query";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Layout from "ui/Layout/Layout";
import EmptyParamPage from "ui/Search/EmptyParamPage";
import SearchField from "ui/Search/SearchField";
import SearchResult from "ui/Search/SearchResult";
import { NextPageWithLayout } from "utils/types";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const param = queryParamToString(router.query.param, "");

  return (
    <div className="bg-paper h-full">
      <Container size="common">
        <div className="py-12">
          <SearchField defaultValue={param} />
          <div className="pt-12">
            {param === "" ? <EmptyParamPage /> : <SearchResult param={param} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

SearchPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
