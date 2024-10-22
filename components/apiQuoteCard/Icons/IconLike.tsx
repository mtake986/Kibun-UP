import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeAPIQuote, TypeUserFromFirestore } from "@/types/type";
import { Heart } from "lucide-react";
import { useState } from "react";

type Props = {
  q: TypeAPIQuote;
  loginUser: TypeUserFromFirestore;
};

const IconLike = ({ q, loginUser }: Props) => {
  const { handleLikeApiQuote, apiQuotesFromFirestore } = useQuote();
  const quote = apiQuotesFromFirestore.find((ele) => ele.id === q.id);
  const [isLiked, setIsLiked] = useState<boolean>(quote?.likedBy.includes(loginUser.uid) ?? false);
  const [numOfLikes, setNumOfLikes] = useState<number>(quote?.likedBy.length ?? 0);
  const heartFill = isLiked ? "red" : undefined;


  const handleClick = async () => {
    try {
      if (isLiked) {
        setNumOfLikes((prev) => prev - 1);
        setIsLiked((prev) => !prev);
        await handleLikeApiQuote(loginUser.uid, q);
      } else {
        setNumOfLikes((prev) => prev + 1);
        setIsLiked((prev) => !prev);
        await handleLikeApiQuote(loginUser.uid, q);
      }
    } catch (error) {
      displayErrorToast(error);
    }
  };

  return (
    <span
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70"
    >
      {isLiked ? (
        <>
          <Heart size={14} className="text-red-500" fill={heartFill} />
          <span className="text-xs text-red-500">{numOfLikes}</span>
        </>
      ) : (
        <>
          <Heart size={14} />
          <span className="text-xs">{numOfLikes}</span>
        </>
      )}
    </span>
  );
};

export default IconLike;
