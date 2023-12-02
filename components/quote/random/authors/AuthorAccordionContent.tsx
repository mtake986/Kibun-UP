import Icons from "@/components/apiQuoteCard/Icons/Icons";
import { AccordionContent } from "@/components/ui/accordion";
import { DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeAPIQuote, TypeAuthorOfAPI } from "@/types/type";
import React, { useCallback, useMemo, useState } from "react";

type Props = {
  author: TypeAuthorOfAPI;
};
const AuthorAccordionContent = ({ author }: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isQuotesShown, setIsQuotesShown] = useState<boolean>(false);

  const [quotes, setQuotes] = useState<TypeAPIQuote[]>([]);

const fetchQuotes = useCallback(async (slug: string) => {
  const url = DEFAULT_URL_FOR_ALL_QUOTES + `?author=${slug}&limit=150`;
  setIsPending(true);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(
        `Something went wrong!! status: ${response.status} ${
          response.statusText || "No status text available."
        }`
      );
    }
    const result = await response.json();
    if (Array.isArray(result.results)) {
      const qs: TypeAPIQuote[] = result.results.map((quote: any) => {
        const tags = quote.tags.map((tag: string) => {
          const tagObject = { name: tag, color: "white" };
          return tagObject;
        });
        const quoteObject: TypeAPIQuote = {
          id: quote._id,
          author: quote.author,
          authorSlug: quote.authorSlug,
          content: quote.content,
          tags: tags,
          likedBy: [],
          bookmarkedBy: [],
          createdBy: "api",
          draftStatus: "Public",
        };
        return quoteObject;
      });
      setQuotes(qs);
    } else {
      // Handle the case where result.results is not an array
    }
  } catch (e: any) {
    displayErrorToast(
      `Failed to fetch quotes. Please try again later. Error: ${e.message}`
    );
    setError(e);
  } finally {
    setIsPending(false);
  }
}, []);

  const displayQuotes = () => {
    if (error) return <div>{error.message}</div>;
    if (isPending) {
      return <div>Loading...</div>;
    }
    if (quotes.length > 0 && isQuotesShown) {
      return quotes.map((quote: TypeAPIQuote) => {
        if (quote.authorSlug !== author.slug) return null;
        return (
          <div
            key={quote.id}
            className="flex flex-col rounded-md bg-slate-50 p-3 dark:bg-slate-900"
          >
            <p className="mb-1 text-sm">{quote.content}</p>
            <div className="flex flex-row flex-wrap gap-1">
              {quote.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="rounded-sm bg-gray-500 px-1 text-xs text-white"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <Icons q={quote} />
          </div>
        );
      });
    }
  };

  const displayQuotesToggleBtn = () => {
    if (isQuotesShown) {
      return (
        <span
          onClick={() => setIsQuotesShown(false)}
          className="cursor-pointer font-semibold transition duration-300 hover:opacity-70"
        >
          Hide {author.quoteCount} quotes
        </span>
      );
    } else {
      return (
        <span
          onClick={() => {
            setIsQuotesShown(true);
            fetchQuotes(author.slug);
          }}
          className="cursor-pointer font-semibold transition duration-300 hover:opacity-70"
        >
          Show {author.quoteCount} quotes
        </span>
      );
    }
  };

  return (
    <AccordionContent className="flex flex-col gap-1">
      <strong className="">{author.description}</strong>
      <p className="text-xs">{author.bio}</p>
      {displayQuotesToggleBtn()}
      {displayQuotes()}
    </AccordionContent>
  );
};

export default AuthorAccordionContent;
