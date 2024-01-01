import { displayErrorToast } from "./displayToast";

export const cannotFindDocInFirestore = (docType: string) => {
  displayErrorToast(
    `Couldn't find the ${docType}. Please reload and try again later.`
  );
}