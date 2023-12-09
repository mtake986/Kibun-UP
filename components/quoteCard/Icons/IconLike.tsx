import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import { useAuth } from "@/context/AuthContext";
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
  const { storeFav, removeFav, allQuotes } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const numOfLikes = q.likedBy.length;
  const isLiked = q.likedBy.includes(loginUser.uid);
  const heartFill = isLiked ? "red" : undefined;

  // if (isLoading) {
  //   return <LoadingSpinnerS />;
  // }

  const handleClick = async () => {
    setIsLoading(true);
    try {
      isLiked
        ? await removeFav(loginUser.uid, q)
        : await storeFav(loginUser.uid, q);
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
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70`}
    >
      {isLiked ? (
        <>
          <Heart size={14} className="text-red-500" fill={heartFill} />
          <span className={`text-red-500`}>{numOfLikes}</span>
        </>
      ) : (
        <>
          <Heart size={14} />
          <span>{numOfLikes}</span>
        </>
      )}
    </button>
  );
};

export default IconLike;
