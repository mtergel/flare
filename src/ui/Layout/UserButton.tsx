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
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { MdFlare } from "@react-icons/all-files/md/MdFlare";
import { useAuth } from "context/auth";
import { useGetUserQuery } from "graphql/generated/graphql";
import useDisclosure from "hooks/useDisclosure";
import { auth } from "initApp";
import { useTheme } from "next-themes";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const UserButton: React.FC<{}> = () => {
  const { user, loading, error } = useAuth();
  if (loading || error) {
    return null;
  }
  if (user) {
    return <UserDD id={user.uid} />;
  } else {
    return <UserLogin />;
  }
};

const UserLogin: React.FC<{}> = () => {
  const [loadingState, setLoadingState] = useState({
    google: false,
    github: false,
    facebook: false,
  });
  const { isOpen, setIsOpen, onOpen } = useDisclosure();
  const handleGoogle = async () => {
    try {
      setLoadingState({
        ...loadingState,
        google: true,
      });
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        toast.error("Enable popups on this website");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Email is used in an other provider");
      }
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error(error.message);
      }

      setLoadingState({
        ...loadingState,
        google: false,
      });
    }
  };

  const handleGithub = async () => {
    try {
      setLoadingState({
        ...loadingState,
        github: true,
      });
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        toast.error("Enable popups on this website");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Email is used in an other provider");
      }
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error(error.message);
      }
      setLoadingState({
        ...loadingState,
        github: false,
      });
    }
  };

  return (
    <Dialog
      title="Flare"
      description="Where programmers share ideas and help each other grow."
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <>
          <header>
            <h1>
              <div className="text-lg font-bold flex-grow flex space-x-1 items-center">
                <span>
                  <MdFlare className="text-primary-500" />
                </span>
                <span className="text-2xl tracking-wider">Flare</span>
              </div>
            </h1>
            <p className="text-secondary text-sm pt-4">
              Where programmers share ideas and help each other grow.
            </p>
          </header>
          <div className="space-y-2 mt-8">
            <Button
              isLoading={loadingState.google}
              loadingText="Please wait"
              isFullWidth
              onClick={handleGoogle}
              leftIcon={<FaGoogle />}
            >
              Continue with Google
            </Button>
            <Button
              isLoading={loadingState.github}
              loadingText="Please wait"
              isFullWidth
              onClick={handleGithub}
              leftIcon={<FaGithub />}
            >
              Continue with Github
            </Button>
          </div>
        </>
      }
    >
      <Button size="sm" color="primary" onClick={onOpen}>
        Log in
      </Button>
    </Dialog>
  );
};

/**
 * User Dropdown component
 */
interface UserDDProps {
  id: string;
}
const UserDD: React.FC<UserDDProps> = ({ id }) => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [{ data, error, fetching }] = useGetUserQuery({
    variables: {
      user_id: id,
    },
  });

  if (error) {
    if (
      error.graphQLErrors.some(
        (e: any) => e.extensions?.code === "jwt-invalid-claims"
      )
    ) {
      // after creating user the correct token leads to claims not found
      // on gcp function 1-2 seconds
      // redirect anyway and let the onboarding page handle it
      router.replace("/onboarding");
    }
  }

  if (data && data.users_by_pk) {
    // redirect to onboarding
    if (data.users_by_pk.username === null) {
      router.replace("/onboarding");
    }
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
          <Avatar
            src={data.users_by_pk.image || undefined}
            fallback={data.users_by_pk.name[0]}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={4}>
          <Link href={`/${data.users_by_pk!.username!}`} passHref>
            <DropdownMenuItem asChild>
              <a className="block" onClick={onClose}>
                <h1 className="font-semibold text-sm">
                  {data.users_by_pk.name}
                </h1>
                <h2 className="text-gray-400 text-xs">
                  {`@${data.users_by_pk.username}`}
                </h2>
              </a>
            </DropdownMenuItem>
          </Link>

          <Link href={`/settings`} passHref>
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
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
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
    );
  }

  return null;
};

export default UserButton;
