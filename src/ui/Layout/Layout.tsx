import Container from "@/components/Container/Container";
import { MdFlare } from "@react-icons/all-files/md/MdFlare";
import Link from "next/link";
import UserButton from "./UserButton";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <header className="bg-paper">
        <Container size="wide" className="h-16 flex items-center">
          <h1>
            <Link href="/" passHref>
              <a className="text-lg font-bold flex-grow flex space-x-1 items-center">
                <span>
                  <MdFlare className="text-primary-500" />
                </span>
                <span className="text-2xl tracking-wider">Flare</span>
              </a>
            </Link>
          </h1>
          <div className="flex-grow flex items-center justify-end">
            <UserButton />
          </div>
        </Container>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
