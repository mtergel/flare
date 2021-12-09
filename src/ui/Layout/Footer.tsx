import Container from "@/components/Container/Container";
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
  return (
    <footer className="bg-paper pt-12">
      <Container size="wide">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3 mb-6 sm:col-span-1 sm:mb-0 text-sm">
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
              <h4 className="mb-2 text-lg font-bold">{i.title}</h4>
              <ul className="space-y-2">
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
                      <Link href={j.link} passHref>
                        <a>{j.title}</a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-8 py-4 border-t text-xs text-tMuted text-center">
          © Flare 2021
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
