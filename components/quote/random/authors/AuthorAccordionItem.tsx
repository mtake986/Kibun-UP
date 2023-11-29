import React, { useCallback, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypeAPIQuote, TypeAuthorOfAPI } from "@/types/type";
import { DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import { displayErrorToast } from "@/functions/displayToast";
import Icons from "@/components/apiQuoteCard/Icons/Icons";
import AuthorAccordionContent from "./AuthorAccordionContent";

type Props = {
  author: TypeAuthorOfAPI;
};

export type PropsFetchData = {
  currentPage: number;
};

const AuthorAccordionItem = ({ author }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`${author.slug}`}>
        <AccordionTrigger>{author.name}</AccordionTrigger>
        <AuthorAccordionContent author={author} />
      </AccordionItem>
    </Accordion>
  );
};

export default AuthorAccordionItem;
