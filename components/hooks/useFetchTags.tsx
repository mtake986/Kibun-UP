import { removeDuplicates } from "@/functions/functions";
import { TypeTagsQuotableAPI } from "@/types/type";
import React, { useState, useEffect, useCallback } from "react";

const useFetchTags = () => {
  const [tags, setTags] = useState<TypeTagsQuotableAPI[]>([]);
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>();

  const url = "https://api.quotable.io/tags";
  const fetchTags = useCallback(() => {
    setIsPending(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `Something went wrong!! status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((res) => {
        const tagsWithDuplicates: TypeTagsQuotableAPI[] = res
          .filter((tag: any) => tag.quoteCount > 10)
          .map((tag: any) => ({ name: tag.name, quoteCount: tag.quoteCount }));
        setTags(removeDuplicates(tagsWithDuplicates));
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return { tags, error, isPending, selectedTag, setSelectedTag };
};

export default useFetchTags;
