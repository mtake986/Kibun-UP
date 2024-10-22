import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast, displayToast } from "@/functions/displayToast";
import { TypeAPIQuote, TypeUserFromFirestore } from "@/types/type";
import React, { useState } from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";

type Props = {
  q: TypeAPIQuote;
  loginUser: TypeUserFromFirestore;
};

const IconLock = ({ q, loginUser }: Props) => {
  const { lockThisQuote, lockedQuote, removeLockFromThisQuote } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-[1px] border-current border-t-transparent text-slate-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const handleUnlock = async () => {
    setIsLoading(true);
    try {
      await removeLockFromThisQuote(loginUser?.uid);
    } catch (error) {
      console.error(error);
      displayErrorToast(error);
    }
    setIsLoading(false);
  };

  const handleLock = async () => {
    setIsLoading(true);
    try {
      if (q.draftStatus === "Draft") {
        displayToast({
          text: "Needs to be Public.",
          color: "red",
        });
        return;
      } else {
        await lockThisQuote(loginUser?.uid, q);
      }
    } catch (error) {
      console.error(error);
      displayErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="cursor-pointer transition duration-300 ease-in hover:opacity-70">
      {lockedQuote?.id === q.id ? (
        <BiLock
          size={16}
          onClick={handleUnlock}
          className="cursor-pointer text-red-500"
        />
      ) : (
        <BiLockOpen size={16} onClick={handleLock} />
      )}
    </span>
  );
};

export default IconLock;
