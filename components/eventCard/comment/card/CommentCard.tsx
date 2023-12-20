import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import { usePathname } from "next/navigation";
import useUserProfileImage from "@/components/utils/useUserProfileImage";
import UrlLink from "@/components/utils/UrlLink";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";
import { MONTHS_IN_STR } from "@/data/CONSTANTS";
import { useState } from "react";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import { TimeAgo } from "@/functions/timeAgo";
import ActionBtn from "./ActionBtn";

type Props = {
  comment: TypeComment;
  loginUser: TypeUserFromFirestore;
};

const CommentCard = ({ comment, loginUser }: Props) => {
  const isMine = loginUser.uid === comment.createdBy;
  const [isPending, setIsPending] = useState<boolean>(true);
  const { creatorImg } = useUserProfileImage({ comment, setIsPending });

  if (isPending) return <LoadingSpinnerXS num={4} />;

  return (
    <div className="flex items-start gap-3">
      <UrlLink
        className="mt-1 cursor-pointer duration-300 hover:opacity-70"
        href={`/profile/${comment.createdBy}`}
        target={"_self"}
        clickOn={creatorImg()}
      />
      <div className="flex flex-grow flex-col items-start">
        <p className="text-xs text-gray-500">
          {TimeAgo(comment.createdAt?.toMillis() ?? "just now")}
        </p>

        <p className="text-sm">{comment.comment}</p>
      </div>

      {isMine ? <ActionBtn  /> : null}
    </div>
  );
};

export default CommentCard;
