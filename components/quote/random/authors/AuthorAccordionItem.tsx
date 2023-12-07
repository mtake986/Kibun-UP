import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypeAuthorOfAPI, TypeSelectedAuthors } from "@/types/type";
import AuthorAccordionContent from "./AuthorAccordionContent";

type Props = {
  author: TypeAuthorOfAPI;
  selectedAuthors: TypeSelectedAuthors[]
  handleAuthors: (value: TypeSelectedAuthors) => void
};

export type PropsFetchData = {
  currentPage: number;
};

const AuthorAccordionItem = ({ author, selectedAuthors, handleAuthors }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`${author.slug}`}>
        <AccordionTrigger>{author.name}</AccordionTrigger>
        <AuthorAccordionContent
          author={author}
          selectedAuthors={selectedAuthors}
          handleAuthors={handleAuthors}
        />
      </AccordionItem>
    </Accordion>
  );
};

export default AuthorAccordionItem;
