import React, { useState, useEffect } from "react";

const useFetchTags = (url: string) => {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
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
      .then((data) => {
        function removeDuplicates(tags: string[]) {
          let unique: string[] = [];
          tags.forEach((tag: string) => {
            if (!unique.includes(tag)) {
              unique.push(tag);
            }
          });
          return unique;
        }
        const tagsWithDuplicates = data.map((tag: any) => tag.name);
        setTags(removeDuplicates(tagsWithDuplicates));
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  return { tags, error, isPending};
};

export default useFetchTags;
