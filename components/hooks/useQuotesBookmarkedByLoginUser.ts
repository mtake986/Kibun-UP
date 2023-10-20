import { TypeLoginUser, TypeQuote } from "@/types/type";
import { useMemo } from "react";

// export const useQuotesLikedByLoginUser = (quotes: TypeQuote[], uid: string) =>
//   quotes.filter((q) => q.likedBy.includes(uid));

export const useQuotesBookmarkedByLoginUser = (
  quotes: TypeQuote[],
  loginUser: TypeLoginUser
) =>
  useMemo(
    () => quotes.filter((q) => q.bookmarkedBy.includes(loginUser.uid)),
    [quotes, loginUser.uid]
  );
