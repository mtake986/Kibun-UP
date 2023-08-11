"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useQuote } from "@/app/context/QuoteContext";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  const { fetchFilteredNotMyQuotes, getQuotesNotMine, updateSortFilterBy } =
    useQuote();
  return (
    <div className="my-2 flex w-full flex-grow justify-between gap-2">
      <Input
        placeholder="Search a tag"
        className="w-full"
        onChange={(e) => {
          updateSortFilterBy('searchTag', e.target.value);
        }}
      />
      <Button
        className={`flex-none cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500 hover:opacity-70`}
        onClick={fetchFilteredNotMyQuotes}
      >
        <SearchIcon size={20} />
      </Button>
      <Button
        className={`flex-none cursor-pointer bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
        onClick={() => {
          updateSortFilterBy("searchTag", '');
          getQuotesNotMine();
        }}
      >
        All
      </Button>
    </div>
  );
}
