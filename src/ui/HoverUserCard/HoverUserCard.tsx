import Avatar from "@/components/Avatar/Avatar";
import { definitions } from "@/utils/generated";
import Link from "next/link";

interface HoverUserCardProps {
  user: definitions["profiles"];
}

const HoverUserCard: React.FC<HoverUserCardProps> = ({ user }) => {
  return (
    <div className="flex flex-col">
      <Link href={`/${user.username}`} passHref>
        <a>
          <Avatar
            src={user.avatar_url}
            fallback={user.display_name}
            size="lg"
          />
        </a>
      </Link>
      <Link href={`/${user.username}`} passHref>
        <a className="mt-1">
          <div className="text-sm">
            <div className="font-semibold text-sm">{user.display_name}</div>
            <div className="text-tMuted text-xs">{`@${user.username}`}</div>
          </div>
        </a>
      </Link>
      <div className="text-sm pt-4">{user.bio}</div>
    </div>
  );
};

export default HoverUserCard;
