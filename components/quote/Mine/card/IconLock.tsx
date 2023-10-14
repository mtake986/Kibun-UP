import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
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
              toast({
                className: "border-none bg-red-100 text-red-500",
                title: "Needs to be Public.",
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
