import { removeDuplicates } from "@/functions/functions";
import React, { useState, useEffect, useCallback } from "react";

const useFetchTags = (url: string) => {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);

  const fetchTags = useCallback(() => {
    setIsPending(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `不具合が発生しました!! status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((res) => {
        const tagsWithDuplicates = res.map((tag: any) => [tag.name, tag.quoteCount]);
        console.log(tagsWithDuplicates)
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
  }, [url]);

  return { tags, error, isPending };
};

export default useFetchTags;
