import { TypeUserFromFirestore, TypeProposal } from "@/types/type";
import { Heart } from "lucide-react";
import { useState } from "react";

type Props = {
  proposal: TypeProposal;
  loginUser: TypeUserFromFirestore;
};

const IconVote = ({ proposal, loginUser }: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [numOfLikes, setNumOfLikes] = useState<number>(
    proposal.votedUpBy ? proposal.votedUpBy.length : 0
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    proposal.votedUpBy ? proposal.votedUpBy.includes(loginUser.uid) : false
  );
  const heartFill = isLiked ? "red" : undefined;

  // const handleClick = async () => {
  //   setIsLoading(true);
  //   try {
  //     if (isLiked) {
  //       setNumOfLikes((prev) => prev - 1);
  //       setIsLiked((prev) => !prev);
  //       await removeFav(loginUser.uid, q);
  //     } else {
  //       setNumOfLikes((prev) => prev + 1);
  //       setIsLiked((prev) => !prev);
  //       await storeFav(loginUser.uid, q);
  //     }
  //   } catch (error) {
  //     displayErrorToast(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleClick = (id: string) => {
    console.log(id)
  }

  return (
    <button
      onClick={() => handleClick(proposal.id)}
      disabled={isPending}
      className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70"
    >
      {isLiked ? (
        <>
          <Heart size={14} className="text-red-500" fill={heartFill} />
          <span className={"text-xs text-red-500"}>{numOfLikes}</span>
        </>
      ) : (
        <>
          <Heart size={14} />
          <span className="text-xs">{numOfLikes}</span>
        </>
      )}
    </button>
  );
};

export default IconVote;
