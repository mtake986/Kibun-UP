export const extractUidFromPath = (path: string) => {
  const pathArray = path.split("/");
  console.log('pathArray: ', pathArray)
  const uid = pathArray[2];
  return uid;
};