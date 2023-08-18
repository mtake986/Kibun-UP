"use client";

import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IEvent } from "@/types/type";
import CardNotMine from "./EventCard";
import { useState } from "react";

import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";
import HeadingThree from "@/components/utils/HeadingThree";
import NoFetchedData from "@/components/utils/NoFetchedData";

type Props = {
  eventsNotMine: IEvent[];
};

const List = ({ eventsNotMine }: Props) => {
  const [user] = useAuthState(auth);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, eventsNotMine);

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
        <NoFetchedData text="No events found" />
      )}
    </div>
  );
};

export default List;
