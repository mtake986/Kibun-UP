import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast, displayToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import React, { useState } from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconLock = ({ q, loginUser }: Props) => {
  const { lockThisQuote, lockedQuote, removeLockFromThisQuote } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <span className="cursor-pointer transition duration-300 ease-in hover:opacity-70">
      {lockedQuote?.id === q.id ? (
        <BiLock
          size={16}
          onClick={() => {
            setIsLoading(true);
            try {
              removeLockFromThisQuote(loginUser?.uid);
            } catch (error) {
              console.error(error);
              displayErrorToast(error);
            }
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }}
          className="cursor-pointer text-red-500"
        />
      ) : (
        <BiLockOpen
          size={16}
          onClick={() => {
            setIsLoading(true);
            try {
              if (q.draftStatus) {
                displayToast({
                  text: "Needs to be Public.",
                  color: "red",
                });
              } else {
                lockThisQuote(loginUser?.uid, q);
              }
            } catch (error) {
              console.error(error);
              displayErrorToast(error);
            }
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }}
        />
      )}
    </span>
  );
};

export default IconLock;
