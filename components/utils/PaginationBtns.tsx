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
    "rounded-md bg-blue-500 px-3 py-2 text-xs text-blue-50 duration-300 ease-in hover:bg-blue-600 dark:bg-gray-50 dark:text-black dark:hover:g-gray-100";

  const clsNameNotFocused =
    "rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-500 duration-300 ease-in hover:bg-slate-100 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600";

  const displaybuttons = () => {
    if (currentPage === 1) {
      return (
        <div className="flex items-center gap-1">
          <button
            key={1}
            className={clsNameFocused}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <span>...</span>
          <button
            key={nPages}
            className={clsNameNotFocused}
            onClick={() => setCurrentPage(nPages)}
          >
            {nPages}
          </button>
        </div>
      );
    } else if (currentPage === nPages) {
      return (
        <div className="flex items-center gap-1">
          <button
            key={1}
            className={clsNameNotFocused}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <span>...</span>
          <button
            key={nPages}
            className={clsNameFocused}
            onClick={() => setCurrentPage(nPages)}
          >
            {nPages}
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <button
            key={1}
            className={clsNameNotFocused}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          {1 + 2 <= currentPage && <span>...</span>}
          {/* currentPage Btn is always shown */}
          <button
            key={currentPage}
            className={clsNameFocused}
            onClick={() => setCurrentPage(currentPage)}
          >
            {currentPage}
          </button>
          {nPages - 2 >= currentPage && <span>...</span>}
          <button
            key={nPages}
            className={clsNameNotFocused}
            onClick={() => setCurrentPage(nPages)}
          >
            {nPages}
          </button>
        </div>
      );
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === nPages;
  return (
    <nav className="flex gap-1">
      <button
        className={`cursor-pointer px-3 py-2 text-xs text-blue-500 dark:text-white ${
          isFirstPage && "opacity-30"
        }`}
        onClick={prevPage}
        disabled={isFirstPage && true}
      >
        {"<"}
      </button>
      {pageNumbers.length <= 3
        ? pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={
                pageNumber === currentPage ? clsNameFocused : clsNameNotFocused
              }
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))
        : displaybuttons()}
      <button
        className={`cursor-pointer px-3 py-2 text-xs text-blue-500 dark:text-white ${
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
