"use client";
import { auth } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IQuote } from "@/types/type";
import CardNotMine from "./CardNotMine";

type Props = {
  quotes: IQuote[];
};

const ListNotMine = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);

  return (
    <div className="mt-2">
      {/* {q.length} */}
      {quotes.map((q, i) => (
        <CardNotMine key={i} q={q} i={i} />
      ))}
    </div>
  );
};

export default ListNotMine;
