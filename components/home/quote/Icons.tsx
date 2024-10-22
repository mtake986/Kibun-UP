import { useQuote } from "@/context/QuoteContext";
import { TypeUserFromFirestore, TypeQuote } from "@/types/type";
import { useState } from "react";
import { BiLockOpen, BiLock, BiRefresh } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

type Props = {
  quote: TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  loginUser: TypeUserFromFirestore;
};
const Icons = ({ quote, type, refetch, loginUser }: Props) => {
  const { removeLockFromThisQuote, lockThisQuote, updateRandomQuote } =
    useQuote();

  const [isPending, setIsPending] = useState<boolean>(false);

  if (isPending) return <div>123</div>;
  return (
    <div className="flex cursor-pointer items-center justify-end gap-3">
      <BiRefresh
        size={20}
        onClick={() => {
          if (type === "locked") {
            alert("To refresh, unlock this quote first.");
          } else if (type === "appChoice") {
            if (refetch) refetch();
          } else {
            updateRandomQuote();
          }
        }}
        className={twMerge(
          type === "locked"
            ? "cursor-not-allowed opacity-30 duration-300"
            : "cursor-pointer duration-300 hover:opacity-50"
        )}
      />
      {type === "locked" ? (
        <BiLock
          size={16}
          onClick={() => {
            if (loginUser) {
              setIsPending(true);
              removeLockFromThisQuote(loginUser.uid);
              setIsPending(false);
            }
          }}
          className="text-red-500 duration-300 hover:text-red-500 hover:opacity-50"
        />
      ) : (
        <BiLockOpen
          size={16}
          onClick={() => {
            if (loginUser) {
              setIsPending(true);
              lockThisQuote(loginUser.uid, quote);
              setIsPending(false);
            }
          }}
          className="cursor-pointer duration-300 hover:opacity-50"
        />
      )}
    </div>
  );
};

export default Icons;
