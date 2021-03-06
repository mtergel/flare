import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLeftSlot,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import { FiFolder } from "@react-icons/all-files/fi/FiFolder";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { useAuth } from "context/auth";
import useDisclosure from "hooks/useDisclosure";
import { useTheme } from "next-themes";
import Link from "next/link";
import LoginForm from "ui/Auth/LoginForm";
import { GiStabbedNote } from "@react-icons/all-files/gi/GiStabbedNote";
import { GiSpellBook } from "@react-icons/all-files/gi/GiSpellBook";

const UserButton: React.FC<{}> = () => {
  const { user } = useAuth();

  if (user) {
    return <UserDD />;
  } else {
    return <UserLogin />;
  }
};

export const UserLogin: React.FC<{}> = () => {
  const { isOpen, setIsOpen, onOpen } = useDisclosure();

  return (
    <Dialog
      title="Flare"
      description="Where programmers share ideas and help each other grow."
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div className="h-full sm:h-96">
          <LoginForm />
        </div>
      }
    >
      <Button
        size="sm"
        color="primary"
        onClick={onOpen}
        className="!bg-primary-700 dark:!bg-primary-400"
      >
        Log in
      </Button>
    </Dialog>
  );
};

/**
 * User Dropdown component
 */
interface UserDDProps {}
const UserDD: React.FC<UserDDProps> = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isOpen, setIsOpen, onClose } = useDisclosure();

  if (user) {
    return (
      <div className="flex items-center space-x-6">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar src={user.avatar_url} fallback={user.display_name} />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={4}>
            <Link href={`/${user.username!}`} passHref>
              <DropdownMenuItem asChild>
                <a className="block py-3" onClick={onClose}>
                  <h1 className="font-semibold text-sm">{user.display_name}</h1>
                  <h2 className="text-tMuted text-xs">{`@${user.username}`}</h2>
                </a>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            <Link href={`/user/dashboard`} passHref>
              <DropdownMenuItem asChild>
                <a onClick={onClose}>
                  <DropdownMenuLeftSlot>
                    <FiFolder />
                  </DropdownMenuLeftSlot>
                  Dashboard
                </a>
              </DropdownMenuItem>
            </Link>
            <Link href={`/user/settings`} passHref>
              <DropdownMenuItem asChild>
                <a onClick={onClose}>
                  <DropdownMenuLeftSlot>
                    <FiSettings />
                  </DropdownMenuLeftSlot>
                  Settings
                </a>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <div className="py-1">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
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
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <DropdownMenuLeftSlot>
                <FiLogOut />
              </DropdownMenuLeftSlot>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AddButton />
      </div>
    );
  }

  return null;
};

const AddButton: React.FC<{}> = () => {
  const { isOpen, onClose, setIsOpen } = useDisclosure();
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          color="primary"
          className="hidden sm:inline-flex !bg-primary-700 dark:!bg-primary-400"
        >
          Add
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={4}>
        <Link href={`/user/new`} passHref>
          <DropdownMenuItem asChild>
            <a onClick={onClose}>
              <div className="flex items-center space-x-3">
                <GiSpellBook className="text-primary-500 dark:text-primary-300 w-8 h-8" />
                <span>Article</span>
              </div>
            </a>
          </DropdownMenuItem>
        </Link>
        <Link href={`/user/new/scribbles`} passHref>
          <DropdownMenuItem asChild>
            <a onClick={onClose}>
              <div className="flex items-center space-x-3">
                <GiStabbedNote className="text-primary-500 dark:text-primary-300 w-8 h-8" />
                <span>Scribbles</span>
              </div>
            </a>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
