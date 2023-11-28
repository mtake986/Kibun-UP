import useAuthorsOfAPI from "@/components/hooks/useAuthorsOfAPI";
import React from "react";
import AuthorAccordionItem from "./AuthorAccordionItem";
import { BsChatQuote } from "react-icons/bs";
import PaginationBtns from "./PaginationBtns";

type Props = {
  setIsListOfAuthors: React.Dispatch<React.SetStateAction<boolean>>;
};
const ListOfAuthors = ({ setIsListOfAuthors }: Props) => {
  const {
    currentAuthors,
    error,
    isPending,
    nPages,
    currentPage,
    setCurrentPage,
  } = useAuthorsOfAPI();

  return (
    <div className="mb-20">
      {/* Actions */}
      <div className="flex items-center justify-between">
        {nPages >= 2 && (
          <PaginationBtns
            nPages={currentAuthors.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <BsChatQuote
          size={16}
          onClick={() => {
            setIsListOfAuthors((prev) => !prev);
          }}
        />
      </div>
      <div className="mb-2 flex flex-col gap-3 text-gray-400">
        {currentAuthors[currentPage - 1].length} of{" "}
        {currentAuthors.reduce((acc, curr) => acc + curr.length, 0)} authors
      </div>
      <div className="flex flex-col gap-3">
        {currentAuthors[currentPage - 1].map((author, i) => (
          <AuthorAccordionItem key={i} author={author} />
        ))}
      </div>
    </div>
  );
};

export default ListOfAuthors;
