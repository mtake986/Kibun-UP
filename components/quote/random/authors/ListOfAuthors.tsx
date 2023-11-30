import useAuthorsOfAPI from "@/components/hooks/useAuthorsOfAPI";
import React from "react";
import AuthorAccordionItem from "./AuthorAccordionItem";
import { BsChatQuote } from "react-icons/bs";
import PaginationBtns from "./PaginationBtns";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import { ArrowUp } from "lucide-react";
import LoadingSpinnerM from "@/components/utils/LoadingSpinnerM";

type Props = {
  setIsListOfAuthors: React.Dispatch<React.SetStateAction<boolean>>;
};
const ListOfAuthors = ({ setIsListOfAuthors }: Props) => {
  const {
    currentAuthors,
    error,
    isPending,
    currentPage,
    setCurrentPage,
  } = useAuthorsOfAPI();

  const displayCards = () => {
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div className="flex flex-col gap-3">
        {currentAuthors[currentPage - 1].map((author, i) => (
          <AuthorAccordionItem key={i} author={author} />
        ))}
      </div>
    );
  };

  return (
    <div className="relative mb-20">
      {/* Actions */}
      <div className="flex items-center justify-between">
        {currentAuthors.length >= 2 && (
          <PaginationBtns
            nPages={currentAuthors.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <BsChatQuote
          className="h-6 w-6 cursor-pointer p-1 duration-300 ease-in hover:opacity-70"
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
      {displayCards()}
    </div>
  );
};

export default ListOfAuthors;
