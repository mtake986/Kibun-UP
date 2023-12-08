import React from "react";

type Props = {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PaginationBtns = ({ nPages, currentPage, setCurrentPage }: Props) => {

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const clsNameFocused =
    "rounded-md bg-blue-500 px-2 py-1 text-xs text-blue-50 dark:bg-slate-800";

  const clsNameNotFocused =
    "cursor-pointer rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-500 duration-300 ease-in hover:bg-slate-100 dark:bg-slate-950 dark:text-white dark:hover:opacity-70";

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === nPages;

  return (
    <nav className="flex gap-1">
      <button
        className={`px-2 py-1 text-xs text-blue-500 dark:text-white ${
          isFirstPage ? "cursor-default opacity-30" : "cursor-pointer"
        }`}
        onClick={prevPage}
        disabled={isFirstPage}
      >
        {"<"}
      </button>
      <div className="flex items-center gap-1">
        <button
          key={1}
          disabled={isFirstPage}
          className={isFirstPage ? clsNameFocused : clsNameNotFocused}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>

        {nPages >= 3 && currentPage >= 3 && <span>...</span>}
        {/* currentPage Btn is always shown */}
        {!isFirstPage && !isLastPage ? (
          <button
          className={clsNameFocused}
            onClick={() => setCurrentPage(currentPage)}
            disabled={true}
            >
            {currentPage}
          </button>
        ) : null}
        {nPages - 2 >= currentPage && <span>...</span>}


        <button
          key={nPages}
          className={isLastPage ? clsNameFocused : clsNameNotFocused}
          onClick={() => setCurrentPage(nPages)}
          disabled={isLastPage}
        >
          {nPages}
        </button>
      </div>
      <button
        className={`px-2 py-1 text-xs text-blue-500 dark:text-white ${
          isLastPage ? "cursor-default opacity-30" : "cursor-pointer"
        }`}
        onClick={nextPage}
        disabled={isLastPage}
      >
        {">"}
      </button>
    </nav>
  );
};

export default PaginationBtns;
