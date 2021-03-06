import { Comment } from "@/utils/types";
import { createContext, SetStateAction, useContext, useState } from "react";

interface ReplyContextInterface {
  replyTo: Comment | null;
  setReplyTo: (value: Comment | null) => void;
  postOwner: string;
}

const ReplyContext = createContext<ReplyContextInterface | null>(null);

const ReplyProvider: React.FC<{ postOwner: string }> = ({
  children,
  postOwner,
}) => {
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const handleReplyTo = (value: Comment | null) => {
    setReplyTo(value);
  };
  return (
    <ReplyContext.Provider
      value={{ replyTo, setReplyTo: handleReplyTo, postOwner }}
    >
      {children}
    </ReplyContext.Provider>
  );
};

export const useReplyTo = () => {
  return useContext(ReplyContext);
};

export default ReplyProvider;
