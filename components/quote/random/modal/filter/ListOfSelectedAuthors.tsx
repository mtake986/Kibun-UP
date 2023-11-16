import { TypeSelectedAuthors } from "@/types/type";
import React from "react";
import { BiTrash } from "react-icons/bi";

type Props = {
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
};

const ListOfSelectedAuthors = ({ selectedAuthors, handleAuthors }: Props) => {
  return (
    <div className="flex flex-wrap gap-5 text-xs">
      {selectedAuthors.length > 0 ? (
        selectedAuthors.map((author: TypeSelectedAuthors) => (
          <div
            key={author.label}
            className="flex items-center gap-2 rounded-md bg-slate-900 px-2 py-1"
          >
            <span>{author.label}</span>
            <BiTrash
              onClick={() => handleAuthors(author)}
              className="h-3 w-3 text-red-500 duration-300 hover:cursor-pointer hover:opacity-70"
            />
          </div>
        ))
      ) : (
        <div>No Authors selected</div>
      )}
    </div>
  );
};

export default ListOfSelectedAuthors;
