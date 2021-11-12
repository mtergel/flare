import Container from "@/components/Container/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import IconButton from "@/components/IconButton/IconButton";
import { FiArrowLeft } from "@react-icons/all-files/fi/FiArrowLeft";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { useTheme } from "next-themes";
import Link from "next/link";

const MinHeader: React.FC<{}> = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 shadow-md dark:border-b">
      <Container className="h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" passHref>
            <IconButton
              variant="ghost"
              aria-label="dashboard"
              isRound
              icon={<FiArrowLeft />}
              as="a"
            />
          </Link>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  variant="ghost"
                  aria-label="theme"
                  isRound
                  icon={<FiSun />}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) => setTheme(value)}
                >
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default MinHeader;
