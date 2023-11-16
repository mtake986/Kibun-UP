import { TypeSelectedAuthors } from "@/types/type";
import React, { useState } from "react";

const useSelectedAuthors = () => {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedAuthors, setSelectedAuthors] = useState<TypeSelectedAuthors[]>(
    []
  );

  const handleAuthors = (value: TypeSelectedAuthors) => {
    if (selectedAuthors.includes(value)) {
      setSelectedAuthors(
        selectedAuthors.filter(
          (ele: TypeSelectedAuthors) => ele.label !== value.label
        )
      );
    } else {
      setSelectedAuthors([...selectedAuthors, value]);
    }
  };
  return { selectedAuthors, handleAuthors };
};

export default useSelectedAuthors;
