import useAuthorsOfAPI from "@/components/hooks/useAuthorsOfAPI";
import React, { useEffect } from "react";
import AuthorAccordionItem from "./AuthorAccordionItem";
import { BsChatQuote } from "react-icons/bs";
import PaginationBtns from "./PaginationBtns";
import { DEFAULT_URL_TO_FETCH_AUTHORS } from "@/data/CONSTANTS";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeSelectedAuthors } from "@/types/type";

type Props = {
  setIsListOfAuthors: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
};

const ListOfAuthors = ({
  setIsListOfAuthors,
  selectedAuthors,
  handleAuthors,
}: Props) => {
  const {
    currentAuthors,
    error,
    currentPage,
    setCurrentPage,
    fetchTotalPages,
    fetchAuthors,
  } = useAuthorsOfAPI();

  useEffect(() => {
    let isCancelled = false;

    const fetchAllAuthors = async () => {
      try {
        const totalPages = await fetchTotalPages(DEFAULT_URL_TO_FETCH_AUTHORS);
        for (let i = 1; i <= totalPages; i++) {
          if (isCancelled) return; // コンポーネントがアンマウントされたかをチェック
          await fetchAuthors(`${DEFAULT_URL_TO_FETCH_AUTHORS}&page=${i}`);
        }
      } catch (error) {
        if (!isCancelled) {
          // エラー処理もコンポーネントがマウントされている場合にのみ実行
          displayErrorToast("Authors fetching failed");
        }
      }
    };

    fetchAllAuthors();

    return () => {
      isCancelled = true; // コンポーネントのクリーンアップ時にフラグを設定
    };
  }, []);

  const displayCards = () => {
    if (error) {
      return <div>Application Error</div>;
    }
    return (
      <div className="flex flex-col gap-3">
        {currentAuthors[currentPage - 1].map((author, i) => (
          // todo: add props and functions inside card component
          <AuthorAccordionItem
            key={i}
            author={author}
            selectedAuthors={selectedAuthors}
            handleAuthors={handleAuthors}
          />
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
