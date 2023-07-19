"use client";

import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IEvent } from "@/types/type";
import CardNotMine from "./CardNotMine";

type Props = {
  eventsNotMine: IEvent[];
};

const ListNotMine = ({ eventsNotMine }: Props) => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {eventsNotMine && eventsNotMine.length >= 1 ? (
        eventsNotMine.map((doc, i) => (
          <CardNotMine key={doc.id} event={doc} i={i} />
        ))
      ) : (
        <div className="mt-10">
          <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
            No Events
          </h2>
        </div>
      )}
    </div>
  );
};

export default ListNotMine;
