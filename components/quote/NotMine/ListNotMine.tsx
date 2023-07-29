"use client";
import { auth } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IQuote } from "@/types/type";
import CardNotMine from "./CardNotMine";
import { useState } from "react";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";

type Props = {
  quotes: IQuote[];
};

const ListNotMine = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, quotes);

  return (
    <div>
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
            <CardNotMine key={doc.id} q={doc} i={i} />
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
            No quotes found
          </h2>
        </div>
      )}
    </div>
  );
};

export default ListNotMine;
