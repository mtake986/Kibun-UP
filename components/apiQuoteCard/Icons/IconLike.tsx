import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeAPIQuote, TypeUserFromFirestore } from "@/types/type";
import { Heart } from "lucide-react";
import { useMemo } from "react";

type Props = {
  q: TypeAPIQuote;
  loginUser: TypeUserFromFirestore;
};

const IconLike = ({ q, loginUser }: Props) => {
  const { handleLikeApiQuote, apiQuotesFromFirestore } = useQuote();

  const { numOfLikes, isLiked, heartFill } = useMemo(() => {
    const quote = apiQuotesFromFirestore.find((ele) => ele.id === q.id);
    const isLiked = quote?.likedBy.includes(loginUser.uid) ?? false;
    const heartFill = isLiked ? "red" : undefined;
    const numOfLikes = quote?.likedBy.length ?? 0;
    return { numOfLikes, isLiked, heartFill };
  }, [apiQuotesFromFirestore, q.id, loginUser.uid]);

  return (
    <span
      onClick={async () => {
        try {
          handleLikeApiQuote(loginUser.uid, q);
        } catch (error) {
          displayErrorToast(error);
        }
      }}
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70`}
    >
      {isLiked ? (
        <>
          <Heart size={14} className="text-red-500" fill={heartFill} />
          <span className={`text-xs text-red-500`}>{numOfLikes}</span>
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
