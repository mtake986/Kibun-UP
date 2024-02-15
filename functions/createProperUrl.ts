export const createProperUrl = (tag: string | undefined) => {
  let url = "https://api.quotable.io/quotes/random";
  if (!tag) return url;
  url =
    tag && tag !== "random"
      ? url + `?tags=${tag}`
      : url;
  return url;
};
