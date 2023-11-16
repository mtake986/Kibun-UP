import React, { useState } from 'react'
import { AND_OR } from "@/data/CONSTANTS";
import { TypeAndOr } from "@/types/type";

const useAndOr = () => {


  const [andOr, setAndOr] = useState<TypeAndOr>({ label: "or", value: "|" });
  const handleAndOr = (value: string) => {
    setAndOr(AND_OR.find((ele) => ele.label === value) as TypeAndOr);
  };
  
  return { andOr, handleAndOr };
}

export default useAndOr