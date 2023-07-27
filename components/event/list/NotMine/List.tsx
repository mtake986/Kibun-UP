"use client";

import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IEvent } from "@/types/type";
import CardNotMine from "./EventCard";
import { useState } from "react";

import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";

type Props = {
  eventsNotMine: IEvent[];
};

const List = ({ eventsNotMine }: Props) => {
  const [user] = useAuthState(auth);

  const [currentPage, setCurrentPage] = useState(1);

  const {nPages, currentRecords} = pagination(currentPage, eventsNotMine);

  return (
    <div>
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
            <CardNotMine key={doc.id} event={doc} i={i} />
          ))}
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
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

export default List;
