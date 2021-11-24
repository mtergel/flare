import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import { useAuth } from "context/auth";
import useDisclosure from "hooks/useDisclosure";
import { useTheme } from "next-themes";
import { useRouter } from "next/dist/client/router";
import LoginForm from "ui/Auth/LoginForm";

const UserButton: React.FC<{}> = () => {
  const { user, error } = useAuth();
  if (error) {
    return null;
  }
  if (user) {
    return <UserDD />;
  } else {
    return <UserLogin />;
  }
};

const UserLogin: React.FC<{}> = () => {
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
      <Button size="sm" color="primary" onClick={onOpen}>
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
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const router = useRouter();

  return <div>Loggen in</div>;
  // const [{ data, error, fetching }] = useGetUserQuery({
  //   variables: {
  //     user_id: id,
  //   },
  // });

  // if (error) {
  //   if (
  //     error.graphQLErrors.some(
  //       (e: any) => e.extensions?.code === "jwt-invalid-claims"
  //     )
  //   ) {
  //     // after creating user the correct token leads to claims not found
  //     // on gcp function 1-2 seconds
  //     // redirect anyway and let the onboarding page handle it
  //     router.replace("/onboarding");
  //   }
  // }

  // if (fetching) {
  //   return <Skeleton className="rounded-full w-10 h-10" />;
  // }

  // if (data && data.users_by_pk) {
  //   // redirect to onboarding
  //   if (data.users_by_pk.username === null) {
  //     router.replace("/onboarding");
  //   }
  //   return (
  //     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
  //       <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
  //         <Avatar
  //           src={data.users_by_pk.image || undefined}
  //           fallback={data.users_by_pk.name[0]}
  //         />
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent sideOffset={4}>
  //         <Link href={`/${data.users_by_pk!.username!}`} passHref>
  //           <DropdownMenuItem asChild>
  //             <a className="block" onClick={onClose}>
  //               <h1 className="font-semibold text-sm">
  //                 {data.users_by_pk.name}
  //               </h1>
  //               <h2 className="text-gray-400 text-xs">
  //                 {`@${data.users_by_pk.username}`}
  //               </h2>
  //             </a>
  //           </DropdownMenuItem>
  //         </Link>

  //         <Link href={`/dashboard`} passHref>
  //           <DropdownMenuItem asChild>
  //             <a onClick={onClose}>
  //               <DropdownMenuLeftSlot>
  //                 <FiFolder />
  //               </DropdownMenuLeftSlot>
  //               Dashboard
  //             </a>
  //           </DropdownMenuItem>
  //         </Link>
  //         <Link href={`/settings`} passHref>
  //           <DropdownMenuItem asChild>
  //             <a onClick={onClose}>
  //               <DropdownMenuLeftSlot>
  //                 <FiSettings />
  //               </DropdownMenuLeftSlot>
  //               Settings
  //             </a>
  //           </DropdownMenuItem>
  //         </Link>

  //         <DropdownMenuSeparator />
  //         <div className="py-1">
  //           <DropdownMenuLabel>Theme</DropdownMenuLabel>
  //           <DropdownMenuRadioGroup
  //             value={theme}
  //             onValueChange={(value) => setTheme(value)}
  //           >
  //             <DropdownMenuRadioItem value="system">
  //               System
  //             </DropdownMenuRadioItem>
  //             <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
  //             <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
  //           </DropdownMenuRadioGroup>
  //         </div>

  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem onClick={logout}>
  //           <DropdownMenuLeftSlot>
  //             <FiLogOut />
  //           </DropdownMenuLeftSlot>
  //           Logout
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
  // }

  // return null;
};

export default UserButton;
