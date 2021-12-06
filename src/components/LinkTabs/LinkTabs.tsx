import { LinkTab } from "@/utils/types";
import * as TabPrimitive from "@radix-ui/react-tabs";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

interface LinkTabsProps {
  items: LinkTab[];
  listAriaLabel: string;
  active: string;
}

const LinkTabs: React.FC<LinkTabsProps> = ({
  items,
  listAriaLabel,
  active,
}) => {
  const router = useRouter();
  return (
    <TabPrimitive.Root
      activationMode="manual"
      onValueChange={(value) => {
        router.push(value);
      }}
      className="link-tabs"
      value={active}
    >
      <TabPrimitive.TabsList
        aria-label={listAriaLabel}
        className="link-tabs-items"
      >
        {items.map((i, index) =>
          i.key === active ? (
            <TabPrimitive.Trigger key={i.href + index} value={i.key} asChild>
              <div className="link-tab-item cursor-default">
                {i.displayName}
              </div>
            </TabPrimitive.Trigger>
          ) : (
            <Link href={i.href} passHref key={i.href + index}>
              <TabPrimitive.Trigger value={i.key} asChild>
                <a className="link-tab-item">{i.displayName}</a>
              </TabPrimitive.Trigger>
            </Link>
          )
        )}
      </TabPrimitive.TabsList>
    </TabPrimitive.Root>
  );
};

export default LinkTabs;
