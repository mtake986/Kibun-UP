import { useQuote } from "@/app/context/QuoteContext";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const SortDialogContent = () => {
  const {
    searchTagForMine,
    setSearchTagForMine,
    fetchFilteredMyQuotes,
    getLoginUserQuotes,
    loginUserQuotes,
    setSortByElement,
  } = useQuote();
  return (
    <div>
      <div className="mb-3 flex flex-col items-center justify-between gap-3">
        <Select
          onValueChange={(ele) => {
            setSortByElement(ele);
          }}
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
        <RadioGroup defaultValue="asc" className="flex items-center gap-5">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="asc" id="asc" />
            <Label htmlFor="asc">Asc.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="desc" id="desc" />
            <Label htmlFor="desc">Desc.</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-3 ">
        <div className="mb-1 text-xs">
          <p>Make sure to click either button </p>
          <p>after closing this dialog to apply.</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            className={`flex-none cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500 hover:opacity-70`}
          >
            <SearchIcon size={20} />
          </Button>
          or
          <Button
            className={`flex-none cursor-pointer bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
          >
            All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortDialogContent;
