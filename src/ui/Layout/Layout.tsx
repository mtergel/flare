import Container from "@/components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import UserButton from "./UserButton";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-paper">
        <Container size="wide" className="h-16 flex items-center">
          <h1>
            <Link href="/" passHref>
              <a className="text-lg font-bold flex-grow flex space-x-1 items-center">
                <Image
                  src="/assets/logo_small.png"
                  alt=""
                  width={48}
                  height={48}
                  objectFit="contain"
                />
              </a>
            </Link>
          </h1>
          <div className="flex-grow flex items-center justify-end">
            <UserButton />
          </div>
        </Container>
      </header>
      <main className="flex-grow">{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
