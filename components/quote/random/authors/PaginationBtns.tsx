import { alphabetArrs } from "@/data/CONSTANTS";
import React from "react";

type Props = {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PaginationBtns = ({ nPages, currentPage, setCurrentPage }: Props) => {
  const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const clsNameFocused =
    "cursor-pointer rounded-md bg-blue-500 sm:px-3 sm:py-2 px-2 py-1 text-xs text-blue-50 duration-300 ease-in hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-slate-800 dark:hover:opacity-70";

  const clsNameNotFocused =
    "cursor-pointer rounded-md bg-blue-50 sm:px-3 sm:py-2 px-2 py-1 text-xs text-blue-500 duration-300 ease-in hover:bg-slate-100 dark:bg-slate-950 dark:text-white dark:hover:opacity-70";

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === nPages;

  return (
    <nav className="flex gap-1">
      <button
        className={`cursor-pointer px-2 py-1 text-xs text-blue-500 dark:text-white sm:px-3 sm:py-2 ${
          isFirstPage && "opacity-30"
        }`}
        onClick={prevPage}
        disabled={isFirstPage && true}
      >
        {"<"}
      </button>

      <div className="flex items-center gap-1">
        <button
          key={1}
          className={isFirstPage ? clsNameFocused : clsNameNotFocused}
          onClick={() => setCurrentPage(1)}
        >
          {alphabetArrs[0].join("")}
        </button>
        {nPages > 3 && currentPage >= 3 && <span>...</span>}
        {/* currentPage Btn is always shown */}
        {!isFirstPage && !isLastPage ? (
          <button
            key={currentPage}
            className={clsNameFocused}
            onClick={() => setCurrentPage(currentPage)}
          >
            {alphabetArrs[currentPage - 1].join("")}
          </button>
        ) : null}
        {nPages - 2 >= currentPage && <span>...</span>}
        <button
          key={nPages}
          className={isLastPage ? clsNameFocused : clsNameNotFocused}
          onClick={() => setCurrentPage(nPages)}
        >
          {alphabetArrs[nPages - 1].join("")}
        </button>
      </div>

      <button
        className={`cursor-pointer px-2 py-1 text-xs text-blue-500 dark:text-white sm:px-3 sm:py-2 ${
          isLastPage && "opacity-30"
        }`}
        onClick={nextPage}
        disabled={isLastPage && true}
      >
        {">"}
      </button>
    </nav>
  );
};

export default PaginationBtns;
