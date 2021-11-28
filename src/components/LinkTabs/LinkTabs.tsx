import * as TabPrimitive from "@radix-ui/react-tabs";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

type LinkTab = {
  href: string;
  displayName: string;
};
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
        {items.map((i, index) => (
          <Link href={i.href} passHref key={i.href + index}>
            <TabPrimitive.Trigger value={i.href} asChild>
              <a className="link-tab-item">{i.displayName}</a>
            </TabPrimitive.Trigger>
          </Link>
        ))}
      </TabPrimitive.TabsList>
    </TabPrimitive.Root>
  );
};

export default LinkTabs;
