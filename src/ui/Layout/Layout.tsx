import Container from "@/components/Container/Container";
import { MdFlare } from "@react-icons/all-files/md/MdFlare";
const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <header className="bg-paper">
        <Container isWide className="h-16 flex items-center">
          <h2 className="text-lg font-bold flex-grow flex space-x-1 items-center">
            <span>
              {/* Placeholder Icon */}
              <MdFlare className="text-primary-500" />
            </span>
            <span className="text-2xl">Flare</span>
          </h2>
        </Container>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
