import { TypeSelectedAuthors } from "@/types/type";
import React, { useState } from "react";

const useSelectedAuthors = () => {
  const [selectedAuthors, setSelectedAuthors] = useState<TypeSelectedAuthors[]>(
    []
  );

  const handleAuthors = (value: TypeSelectedAuthors) => {
    console.log(value);
    setSelectedAuthors((prev) => {
      if (prev.some((ele) => ele.label === value.label)) {
        return prev.filter((ele) => ele.label !== value.label);
      } else {
        return [...prev, value];
      }
    });
  };
  return { selectedAuthors, handleAuthors };
};

export default useSelectedAuthors;
