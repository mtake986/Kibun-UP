import React, { useState } from 'react'
import { SORT_BYS } from "@/data/CONSTANTS";
import { TypeSortBy } from "@/types/type";

const useSortBy = () => {
  const [sortBy, setSortBy] = useState<TypeSortBy>(SORT_BYS[0]);

const handleSortBy = (value: string) => {
  const sortOption = SORT_BYS.find((ele) => ele.label === value);
  if (sortOption) {
    setSortBy(sortOption);
  } else {
    setSortBy({
      label: "Author",
      value: "author",
    });
  }
};

  return { sortBy, handleSortBy};
}

export default useSortBy