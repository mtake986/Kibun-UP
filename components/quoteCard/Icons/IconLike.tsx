import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeUserFromFirestore, TypeQuote } from "@/types/type";
import { Heart } from "lucide-react";
import { useState } from "react";

type Props = {
  q: TypeQuote;
  loginUser: TypeUserFromFirestore;
};

const IconLike = ({ q, loginUser }: Props) => {
  const { storeFav, removeFav } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [numOfLikes, setNumOfLikes] = useState<number>(
    q.likedBy ? q.likedBy.length : 0
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    q.likedBy ? q.likedBy.includes(loginUser.uid) : false
  );
  const heartFill = isLiked ? "red" : undefined;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (isLiked) {
        setNumOfLikes((prev) => prev - 1);
        setIsLiked((prev) => !prev);
        await removeFav(loginUser.uid, q);
      } else {
        setNumOfLikes((prev) => prev + 1);
        setIsLiked((prev) => !prev);
        await storeFav(loginUser.uid, q);
      }
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
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

export default IconLike;
