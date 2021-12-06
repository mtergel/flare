import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Fallback from "@/components/Fallback/Fallback";
import Pagination from "@/components/Pagination/Pagination";
import { queryParamToNumber } from "@/utils/query";
import useSearchUsers from "hooks/supabase-hooks/search/useSearchUsers";
import { useRouter } from "next/dist/client/router";

interface SearchResultUserProps {
  param: string;
  count: number;
}

const itemsPerPage = 24;

const SearchResultUser: React.FC<SearchResultUserProps> = ({
  param,
  count,
}) => {
  const router = useRouter();
  const page = queryParamToNumber(router.query.p, 1);

  const { data, isLoading } = useSearchUsers({
    param,
    page,
    itemsPerPage,
  });

  const handleLinkBuild = (page: number) => {
    return `/search?param=${param}&source=users&p=${page}`;
  };

  // TODO error handling

  if (isLoading) {
    return <Fallback />;
  }

  if (data) {
    return (
      <div>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {data.map((i) => (
              <div key={i.id} className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar src={i.avatar_url} alt={i.display_name} />
                  <div>
                    <p className="text-sm font-semibold line-clamp-1">
                      {i.display_name}
                    </p>
                    <p className="text-xs text-tMuted line-clamp-1">
                      @{i.username}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" color="primary">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-tMuted font-bold text-sm text-center">{`No search results for ${param} were found`}</p>
        )}

        {count > 0 && count > itemsPerPage && (
          <div className="my-4 text-center">
            <Pagination
              currentPage={page <= 0 ? 1 : page}
              itemsPerPage={itemsPerPage}
              totalCount={count}
              buildLink={handleLinkBuild}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default SearchResultUser;
