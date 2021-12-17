import Fallback from "@/components/Fallback/Fallback";
import useFeaturedTags from "hooks/useFeaturedTags";
import Image from "next/image";
import Link from "next/link";

const EmptyParamPage: React.FC<{}> = () => {
  const { fetching, options } = useFeaturedTags();

  return (
    <>
      {fetching ? (
        <div>
          <Fallback />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {options.items.map((i) => (
            <Link key={i.id} href={`/tags/${i.id}`} passHref>
              <a className="transition-colors zinc-hover p-4 flex flex-col items-center justify-center space-y-2 border rounded-xl">
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
      )}
    </>
  );
};

export default EmptyParamPage;
