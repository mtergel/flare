import Container from "@/components/Container/Container";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import UserButton from "./UserButton";

interface LayoutProps {
  hideFooter?: boolean;
}
const Layout: React.FC<LayoutProps> = ({ hideFooter, children }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-paper">
        <Container size="wide" className="h-16 flex items-center">
          <h1>
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
          </h1>
          <div className="flex-grow flex items-center justify-end space-x-2">
            <Link href="/search" passHref>
              <a className="p-2 rounded-full">
                <FiSearch className="h-5 w-5 text-tMuted" />
              </a>
            </Link>
            <UserButton />
          </div>
        </Container>
      </header>
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
