import React, { useState } from "react";
import { AND_OR } from "@/data/CONSTANTS";
import { TypeAndOr } from "@/types/type";

const useAndOr = () => {
  const [andOr, setAndOr] = useState<TypeAndOr>(AND_OR[1]);
  const handleAndOr = (value: string) => {
    const foundValue = AND_OR.find((ele) => ele.label === value);
    if (foundValue) {
      setAndOr(foundValue as TypeAndOr);
    } else {
      setAndOr(AND_OR[0]);
      throw new Error("Invalid value");
    }
  };

  return { andOr, handleAndOr };
};

export default useAndOr;
