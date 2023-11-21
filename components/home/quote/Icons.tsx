import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { Heart } from "lucide-react";
import { useCallback } from "react";
import { BiLockOpen, BiLock, BiRefresh } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { usePathname } from "next/navigation";

type Props = {
  quote: TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  loginUser: TypeLoginUser;
};
const Icons = ({ quote, type, refetch, loginUser }: Props) => {
  const { removeLockFromThisQuote, lockThisQuote, updateRandomQuote } =
    useQuote();

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
        className={`${
          type === "locked"
            ? "cursor-not-allowed opacity-30 duration-300"
            : "cursor-pointer duration-300 hover:opacity-50"
        }`}
      />
      {type === "locked" ? (
        <BiLock
          size={16}
          onClick={() => {
            if (loginUser) {
              if (type === "locked") {
                removeLockFromThisQuote(loginUser.uid);
              } else {
                lockThisQuote(loginUser.uid, quote as any);
              }
            }
          }}
          className={`text-red-500  duration-300 hover:text-red-500 hover:opacity-50`}
        />
      ) : (
        <BiLockOpen
          size={16}
          onClick={() => {
            if (loginUser) {
              lockThisQuote(loginUser.uid, quote as any);
            }
          }}
          className="cursor-pointer duration-300 hover:opacity-50"
        />
      )}
    </div>
  );
};

export default Icons;
