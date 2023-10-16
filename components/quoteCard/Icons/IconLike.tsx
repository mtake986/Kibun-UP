import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeLoginUser, TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import { Heart } from "lucide-react";

type Props = {
  q: TypeQuote | TypeQuoteQuotetableAPI;
  loginUser: TypeLoginUser;
};

const IconLike = ({ q, loginUser }: Props) => {
  const { numOfFavs, storeFav, removeFav } = useQuote();
  const isFav = numOfFavs.some(
    (favQuote) => favQuote.qid === q.id && favQuote.uids.includes(loginUser.uid)
  );

  const heartFill = isFav ? "red" : undefined;

  return (
    <span
      onClick={() => {
        isFav ? removeFav(loginUser.uid, q) : storeFav(loginUser.uid, q);
      }}
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
    >
      {numOfFavs.some(
        (favQuote) =>
          // favQuote.qid === q.id && favQuote.uids.includes(loginUser.uid)
          favQuote.qid === q.id
      ) ? (
        <>
          <Heart size={14} fill={heartFill} className="text-red-500" />

          {numOfFavs.map((favQuote, i) =>
            favQuote.qid === q.id ? (
              <span key={i} className="text-sm text-red-500">
                {favQuote.uids.length}
              </span>
            ) : null
          )}
        </>
      ) : (
        <>
          <Heart size={14} className="text-red-500" />
          <span className="text-sm text-red-500">0</span>
        </>
      )}
    </span>
  );
};

export default IconLike;
