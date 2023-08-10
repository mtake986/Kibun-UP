import { useQuote } from "@/app/context/QuoteContext";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SortBtn = () => {
  const {
    searchTagForMine,
    setSearchTagForMine,
    fetchFilteredMyQuotes,
    getLoginUserQuotes,
    loginUserQuotes,
    setSortByElement,
  } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        setSortByElement(ele);
      }}
      // value={ele}
    >
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="quote">Quote</SelectItem>
        <SelectItem value="person">Person</SelectItem>
        <SelectItem value="createdAt">Created At</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortBtn;
