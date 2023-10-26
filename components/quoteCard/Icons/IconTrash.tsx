import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeQuote } from "@/types/type";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  q: TypeQuote;
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
      className="cursor-pointer duration-300 hover:opacity-70"
    />
  );
};

export default IconTrash;
