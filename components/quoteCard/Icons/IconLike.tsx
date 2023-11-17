import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { Heart } from "lucide-react";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconLike = ({ q, loginUser }: Props) => {
  const { storeFav, removeFav, allQuotes } = useQuote();

  let numOfLikes = 0;
  const isLiked = allQuotes.some((ele) => {
    if (ele.id === q.id && ele.likedBy.some((id) => id === loginUser.uid)) {
      numOfLikes = ele.likedBy.length;
      return true;
    };
  });
  // const isLiked = q.likedBy.some((id) => id === loginUser.uid);
  const heartFill = isLiked ? "red" : undefined;

  return (
    <span
      onClick={async () => {
        try {
          isLiked
            ? await removeFav(loginUser.uid, q)
            : await storeFav(loginUser.uid, q);
        } catch (error) {
          displayErrorToast(error);
        }
      }}
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
    </span>
  );
};

export default IconLike;
