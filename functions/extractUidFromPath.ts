export const extractUidFromPath = (path: string) => {
  const pathArray = path.split("/");
  const uid = pathArray[2];
  return uid;
};