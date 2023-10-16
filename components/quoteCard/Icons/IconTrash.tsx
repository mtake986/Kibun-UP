import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  q: TypeQuote | TypeQuoteQuotetableAPI;
};

const IconTrash = ({ q }: Props) => {
  const { lockedQuote, handleDelete, removeLockFromThisQuote } = useQuote();

  const { loginUser } = useAuth();
  return (
    <Trash
      size={14}
      onClick={() => {
        try {
          handleDelete(q.id);
          if (loginUser && lockedQuote?.id === q.id)
            removeLockFromThisQuote(loginUser?.uid);
        } catch (e) {
          displayErrorToast(e);
        }
      }}
      className="cursor-pointer duration-300 hover:opacity-50"
    />
  );
};

export default IconTrash;
