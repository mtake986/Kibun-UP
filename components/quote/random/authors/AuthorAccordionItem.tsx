import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypeAuthorsOfAPI } from "@/types/type";

type Props = {
  author: TypeAuthorsOfAPI;
};

const AuthorAccordionItem = ({ author }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{author.name}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          <strong className="">{author.description}</strong>
          <p className="text-xs">{author.bio}</p>
          <strong>{author.quoteCount} quotes found</strong>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AuthorAccordionItem;
