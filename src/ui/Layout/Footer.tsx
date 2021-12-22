import Container from "@/components/Container/Container";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {}

const footerItems = [
  {
    title: "About",
    items: [
      {
        title: "About Flare",
        link: "/about",
        external: false,
      },
      {
        title: "FAQ",
        link: "/faq",
        external: false,
      },
      {
        title: "Contributing",
        link: "https://github.com/mtergel/flare",
        external: true,
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        title: "Privacy Policy",
        link: "/privacy",
        external: false,
      },
      {
        title: "Terms of use",
        link: "/terms",
        external: false,
      },
    ],
  },
];

const Footer: React.FC<FooterProps> = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-paper pt-12">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-1 md:col-span-3 mb-6 sm:col-span-1 sm:mb-0 text-sm">
            <Link href="/" passHref>
              <a className="text-lg font-bold flex-grow flex space-x-2 items-center">
                <Image
                  src="/assets/logo_small.png"
                  alt=""
                  width={48}
                  height={48}
                  objectFit="contain"
                />
                <span className="text-2xl">Flare</span>
              </a>
            </Link>
            <p className="text-xs text-tMuted">
              Blogging Platform for developers.
            </p>
            <div className="mt-8 rounded-lg overflow-hidden">
              <a
                href="https://www.buymeacoffee.com/trglm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/default-yellow.png"
                  alt="Buy Me A Coffee"
                  height="41"
                  width="174"
                  className="rounded-lg"
                />
              </a>
            </div>
          </div>
          {footerItems.map((i, index) => (
            <nav key={index} className="text-sm">
              <p className="mb-6 text-xl font-bold">{i.title}</p>
              <ul className="space-y-6">
                {i.items.map((j, index) => (
                  <li key={index} className="text-tMuted">
                    {j.external ? (
                      <a
                        href={j.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {j.title}
                      </a>
                    ) : (
                      <Link href={j.link} passHref prefetch={false}>
                        <a>{j.title}</a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-8 py-4 border-t text-sm text-tMuted">
          <span>© Flare 2021</span>
          <div className="flex item-center space-x-2">
            <div>Made with ❤️. By Tergel.</div>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/mtergel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github-tergel"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.currentTarget.value)}
              className="bg-opacity-0 border bg-paper py-1 pl-1"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
