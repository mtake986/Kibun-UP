import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
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
        handleDelete(q.id);
        if (loginUser && lockedQuote?.id === q.id)
          removeLockFromThisQuote(loginUser?.uid);
      }}
      className="cursor-pointer duration-300 hover:opacity-50"
    />
  );
};

export default IconTrash;
