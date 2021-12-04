import Container from "@/components/Container/Container";
import Fallback from "@/components/Fallback/Fallback";
import { queryParamToString } from "@/utils/query";
import useFeaturedTags from "hooks/useFeaturedTags";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "ui/Layout/Layout";
import SearchField from "ui/Search/SearchField";
import { NextPageWithLayout } from "utils/types";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const param = queryParamToString(router.query.param, "");

  return (
    <div className="bg-paper h-full">
      <Container size="common">
        <div className="py-12">
          <SearchField />
          <div className="pt-12">
            {param === "" ? <EmptyParamPage /> : <SearchResult param={param} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

const EmptyParamPage: React.FC<{}> = () => {
  const { fetching, options } = useFeaturedTags();

  if (fetching) {
    return (
      <div>
        <Fallback />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {options.items.map((i) => (
        <Link key={i.id} href={`/tag/${i.id}`} passHref>
          <a className="transition-colors hover:bg-gray-100 p-4 flex flex-col items-center justify-center space-y-2 border rounded-xl">
            <Image
              className="rounded-full border"
              width={40}
              height={40}
              alt={i.name}
              src={i.image_url}
            />
            <p className="text-sm line-clamp-1">{i.name}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

const SearchResult: React.FC<{ param: string }> = ({ param }) => {
  return <p>{param}</p>;
};

SearchPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
