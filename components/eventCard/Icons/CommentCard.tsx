import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import { usePathname } from "next/navigation";
import useUserProfileImage from "@/components/utils/useUserProfileImage";
import UrlLink from "@/components/utils/UrlLink";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";
import { MONTHS_IN_STR } from "@/data/CONSTANTS";

type Props = {
  comment: TypeComment;
  loginUser: TypeUserFromFirestore;
};

function TimeAgo(timestamp: number) {
  const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(seconds / interval.seconds);

      if (count >= 1) {
        return count === 1
          ? `${count} ${interval.label} ago`
          : `${count} ${interval.label}s ago`;
      }
    }

    return "just now";
  };

  return <span>{timeAgo(timestamp)}</span>;
}

const CommentCard = ({ comment, loginUser }: Props) => {
  const isMine = loginUser.uid === comment.createdBy;

  const { creatorImg } = useUserProfileImage({ comment });
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
          {TimeAgo(comment.createdAt?.toMillis() ?? 'just now')}
        </p>

        <p className="text-sm">{comment.comment}</p>
      </div>

      {isMine ? (
        <button className="h-4 w-4">
          <BiDotsVertical className="cursor-pointer duration-300 hover:opacity-70" />
        </button>
      ) : null}
    </div>
  );
};

export default CommentCard;
