import Avatar from "@/components/Avatar/Avatar";
import HoverCard from "@/components/HoverCard/HoverCard";
import { definitions } from "@/utils/generated";
import Link from "next/link";
import HoverUserCard from "ui/HoverUserCard/HoverUserCard";

interface UserInfoProps {
  user: definitions["profiles"];
}

const UserInfo: React.FC<UserInfoProps> = ({ user, children }) => {
  return (
    <HoverCard
      contentClassname="w-[300px] p-4"
      content={<HoverUserCard user={user} />}
    >
      <div>
        <Link href={`/${user.username}`} passHref prefetch={false}>
          <a className="article-user">
            <Avatar
              src={user.avatar_url}
              fallback={user.display_name}
              size="sm"
            />
            <div className="article-user-info">
              <div className="line-clamp-1">{user.display_name}</div>
              {children}
            </div>
          </a>
        </Link>
      </div>
    </HoverCard>
  );
};

export default UserInfo;
