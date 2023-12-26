import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import useUserProfileImage from "@/components/utils/useUserProfileImage";
import UrlLink from "@/components/utils/UrlLink";
import { useState } from "react";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import { TimeAgo } from "@/functions/timeAgo";
import ActionBtn from "./ActionBtn";
import CommentUpdateForm from "./CommendUpdateForm";

type Props = {
  comment: TypeComment;
  loginUser: TypeUserFromFirestore;
  eventCreatorId: string;
  eid: string;
  goPrevAsNoCurrentRecords?: () => void;
};

const CommentCard = ({
  comment,
  loginUser,
  eventCreatorId,
  eid,
  goPrevAsNoCurrentRecords,
}: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { creatorImg } = useUserProfileImage({ comment, setIsPending });
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  if (isPending) return <LoadingSpinnerXS num={4} />;

  if (isUpdateMode) {
    return (
      <CommentUpdateForm
        comment={comment}
        setIsUpdateMode={setIsUpdateMode}
        eid={eid}
      />
    );
  }
  return (
    <div className="flex items-start gap-3">
      <UrlLink
        className="mt-1 cursor-pointer duration-300 hover:opacity-70"
        href={`/profile/${comment.createdBy}`}
        target={"_self"}
        clickOn={creatorImg()}
      />
      <div className="flex flex-grow flex-col items-start">
        <div className="flex w-full items-center justify-between gap-3 text-gray-500">
          <p className="text-xs text-gray-500">
            {TimeAgo(comment.createdAt?.toMillis() ?? "just now")}
          </p>

          <ActionBtn
            comment={comment}
            loginUser={loginUser}
            eventCreatorId={eventCreatorId}
            eid={eid}
            setIsUpdateMode={setIsUpdateMode}
            goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
          />
        </div>

        <p className="text-sm">{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
