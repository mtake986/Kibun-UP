import React, { useState } from "react";

const useSelectedAuthors = () => {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const handleAuthors = (value: string) => {
    if (selectedAuthors.includes(value)) {
      setSelectedAuthors(selectedAuthors.filter((author) => author !== value));
    } else {
      setSelectedAuthors([...selectedAuthors, value]);
    }
    console.log(selectedAuthors, value)
  };
  return { selectedAuthors, handleAuthors };
};

export default useSelectedAuthors;
