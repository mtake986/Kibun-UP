import React, { useState } from 'react'
import { SORT_BYS } from "@/data/CONSTANTS";
import { TypeSortBy } from "@/types/type";

const useSortBy = () => {


  const [sortBy, setSortBy] = useState<TypeSortBy>({
    label: "Author",
    value: "author",
  });

  const handleSortBy = (value: string) => {
    setSortBy(SORT_BYS.find((ele) => ele.label === value) as TypeSortBy);
  };

  return { sortBy, handleSortBy};
}

export default useSortBy