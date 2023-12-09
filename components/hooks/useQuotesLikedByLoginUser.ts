import { TypeUserFromFirestore, TypeQuote } from "@/types/type";
import { useMemo } from "react";

// export const useQuotesLikedByLoginUser = (quotes: TypeQuote[], uid: string) =>
//   quotes.filter((q) => q.likedBy.includes(uid));

export const useQuotesLikedByLoginUser = (
  quotes: TypeQuote[],
  loginUser: TypeUserFromFirestore
) =>
  useMemo(
    () => quotes.filter((q) => q.likedBy.includes(loginUser.uid)),
    [quotes, loginUser.uid]
  );
