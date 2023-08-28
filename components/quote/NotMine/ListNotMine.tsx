"use client";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IQuote } from "@/types/type";
import CardNotMine from "./CardNotMine";
import { useState } from "react";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import OrderSelect from "./Sort/OrderSelect";
import ElementSelect from "./Sort/ElementSelect";
import { SearchBar } from "./SearchBar";

type Props = {
  quotes: IQuote[];
};

const ListNotMine = ({ quotes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, quotes);

  return (
    <div className="mb-20">
      <div className="my-2 flex flex-col items-center gap-2 sm:flex-row">
        {/* <SortBtn /> */}
        <div className="flex w-full flex-row gap-3">
          <OrderSelect />
          <ElementSelect />
        </div>
        <SearchBar />
      </div>
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
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default ListNotMine;
