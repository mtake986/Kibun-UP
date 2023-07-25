import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const PaginationComp = ({ nPages, currentPage, setCurrentPage }: Props) => {
  const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const clsNameFocused =
    "bg-blue-500 text-white hover:bg-blue-500 hover:text-white hover:opacity-70";

  const clsNameNotFocused =
    "border border-blue-500 bg-blue-50 text-blue-500 hover:text-blue-500 hover:opacity-70";

  const displayButtons = () => {
    if (currentPage === 1) {
      return (
        <div className="flex items-center gap-1">
          <Button
            key={1}
            className={clsNameFocused}
            variant="outline"
            onClick={() => setCurrentPage(1)}
          >
            1
          </Button>
          <Button
            key={currentPage + 1}
            className={clsNameNotFocused}
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </Button>
          <span>...</span>
          <Button
            key={nPages}
            className={clsNameNotFocused}
            variant="outline"
            onClick={() => setCurrentPage(nPages)}
          >
            {nPages}
          </Button>
        </div>
      );
    } else if (currentPage === nPages) {
      return (
        <div className="flex items-center gap-1">
          <Button
            key={1}
            className={clsNameNotFocused}
            variant="outline"
            onClick={() => setCurrentPage(1)}
          >
            1
          </Button>
          <span>...</span>
          <Button
            key={currentPage - 1}
            className={clsNameNotFocused}
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {currentPage - 1}
          </Button>
          <Button
            key={nPages}
            className={clsNameFocused}
            variant="outline"
            onClick={() => setCurrentPage(nPages)}
          >
            {nPages}
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <Button
            key={1}
            className={clsNameNotFocused}
            variant="outline"
            onClick={() => setCurrentPage(1)}
          >
            1
          </Button>
          {1 + 2 <= currentPage && <span>...</span>}
          {/* currentPage Btn is always shown */}
          <Button
            key={currentPage}
            className={clsNameFocused}
            variant="outline"
            onClick={() => setCurrentPage(currentPage)}
          >
            {currentPage}
          </Button>
          {nPages - 2 >= currentPage && <span>...</span>}
          <Button
            key={nPages}
            className={clsNameNotFocused}
            variant="outline"
            onClick={() => setCurrentPage(nPages)}
          >
            {nPages}
          </Button>
        </div>
      );
    }
  };

  return (
    <nav className="flex gap-1">
      <Button
        className={`cursor-pointer border border-blue-500 bg-blue-50 text-blue-500 hover:text-blue-500 hover:opacity-70`}
        variant="outline"
        onClick={prevPage}
        disabled={currentPage === 1 && true}
      >
        Prev
      </Button>
      {displayButtons()}
      <Button
        className={`cursor-pointer border border-blue-500 bg-blue-50 text-blue-500 hover:text-blue-500 hover:opacity-70`}
        variant="outline"
        onClick={nextPage}
        disabled={currentPage === nPages && true}
      >
        Next
      </Button>
    </nav>
  );
};

export default PaginationComp;
