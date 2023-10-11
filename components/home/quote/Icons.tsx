import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { IQuote } from "@/types/type";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiLockOpen, BiRefresh } from "react-icons/bi";
type Props = {
  quote: IQuote;
  type: "locked" | "appChoice" | "notAppChoice";
};
const Icons = ({ quote, type }: Props) => {
  const { removeLockFromThisQuote, lockThisQuote, updateRandomQuote } =
    useQuote();
  const { loginUser } = useAuth();
  const { refetch } = useFetchQuoteFromQuotableAPI();

  return (
    <div className="flex items-center gap-5">
      <BiRefresh
        size={20}
        onClick={() => {
          if (type === "locked") {
            alert("To refresh, unlock this quote first.");
          } else if (type === "appChoice") {
            refetch();
          } else {
            updateRandomQuote();
          }
        }}
        className={`${
          type === "locked"
            ? "cursor-not-allowed opacity-30 duration-300"
            : "cursor-pointer duration-300 hover:opacity-50"
        }`}
      />
      <BiLockOpen
        size={16}
        onClick={() => {
          if (loginUser) {
            if (type === "locked") {
              removeLockFromThisQuote(loginUser.uid);
            } else {
              lockThisQuote(loginUser.uid, quote);
            }
          }
        }}
        className={`${
          type === "locked"
            ? "cursor-pointer text-red-500 duration-300 hover:opacity-50"
            : "cursor-pointer duration-300 hover:opacity-50"
        }`}
      />
    </div>
  );
};

export default Icons;
