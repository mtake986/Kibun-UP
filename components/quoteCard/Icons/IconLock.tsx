import { useQuote } from "@/context/QuoteContext";
import { displayToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import React from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconLock = ({ q, loginUser }: Props) => {
  const { lockThisQuote, lockedQuote, removeLockFromThisQuote } = useQuote();

  return (
    <>
      {lockedQuote?.id === q.id ? (
        <BiLock
          size={16}
          onClick={() => {
            removeLockFromThisQuote(loginUser?.uid);
          }}
          className="cursor-pointer text-red-500 duration-300 hover:opacity-50"
        />
      ) : (
        <BiLockOpen
          size={16}
          onClick={() => {
            if (q.isDraft) {
              displayToast({
                text: "Needs to be Public.",
                color: "red",
              });
            } else {
              lockThisQuote(loginUser?.uid, q);
            }
          }}
          className="cursor-pointer hover:opacity-50"
        />
      )}
    </>
  );
};

export default IconLock;
