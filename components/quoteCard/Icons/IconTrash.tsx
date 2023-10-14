import { toast } from "@/components/ui/use-toast";
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
        try {
          handleDelete(q.id);
          if (loginUser && lockedQuote?.id === q.id)
            removeLockFromThisQuote(loginUser?.uid);
        } catch (error) {
          toast({
            className: "border-none bg-red-100 text-red-500",
            title: "Something wrong. Please reload and try again.",
          });
        }
      }}
      className="cursor-pointer duration-300 hover:opacity-50"
    />
  );
};

export default IconTrash;
