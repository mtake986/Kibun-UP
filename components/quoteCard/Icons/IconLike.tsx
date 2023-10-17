import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { Heart } from "lucide-react";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconLike = ({ q, loginUser }: Props) => {
  const { storeFav, removeFav } = useQuote();
  const isLiked = q.likedBy.some((id) => id === loginUser.uid);
  const heartFill = isLiked ? "red" : undefined;
  
  return (
  <span
    onClick={() => {
      isLiked ? removeFav(loginUser.uid, q) : storeFav(loginUser.uid, q);
    }}
    className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
  >
    {isLiked ? (
      <Heart size={14} className="text-red-500" fill={heartFill} />
    ) : (
      <Heart size={14} className="text-red-500" />
    )}
    <span className={`text-red-500`}>
      {q.likedBy.length}
    </span>
  </span>
  );
};

export default IconLike;
