import { Timestamp } from "firebase/firestore";

export interface TypeEvent {
  id: string;
  eventTitle: string;
  place?: string;
  description: string;
  eventDate: Timestamp;
  uid: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type TypeQuote = {
  id: string;
  author: string;
  content: string;
  tags: ITag[];
  likedBy: string[];
  bookmarkedBy: string[];
  userInfo: IUserInfo | "api";
  isDraft: boolean;
  authorSlug?: string;
  createdAt?: Date;
  updatedAt?: Date;
  qid?: string;
  uid?: string;
};

export interface TypeEventInputValues {
  eventTitle: string;
  place?: string;
  description?: string;
  eventDate: Date;
}

export interface TypeQuoteInputValues {
  author: string;
  content: string;
  isDraft: boolean;
  tags: ITag[];
}

export interface IUserInfo {
  uid: string | undefined;
  displayName: string | null | undefined;
  photoUrl: string | null | undefined;
}

export interface ITag {
  name: string;
  color: string;
}

export interface ISortFilterBy {
  order: string;
  sortByElement: string;
  searchTag: string;
}

export type TypeLoginUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  settings: {
    itemsPerPage: number;
    tagForQuotableApi: string;
    quoteTypeForHome: TypeQuoteTypeForHome;
    apiQuotesPerPage: TypeQuotesPerPage;
  };
};

export type TypeQuoteTypeForHome = "bookmarks" | "mine" | "appChoice";

export type TypeUpdateUserInputs = {
  photoURL?: string | null;
  displayName?: string;
  itemsPerPage?: number;
};

export type TypeTagsQuotableAPI = {
  name: string;
  quoteCount: number;
};

export type TypeTagError = {
  // errorName: "undefOrNoChars" | "over20chars" | "sameTagName" | "over5tags";
  // isError: boolean;
  message: string;
};

export type TypeTagErrors = {
  undefOrNoChars?: TypeTagError;
  over20chars?: TypeTagError;
  sameTagName?: TypeTagError;
  over5tags?: TypeTagError;
};

export type ProfileTabs = {
  name: "quotes" | "bookmarks" | "likes" | "events";
  length: number;
};

export type TypeTabNamesOfQuotes = "all" | "mine" | "api";

export type TypeQuotesPerPage = 10 | 25 | 50 | 100;

export type TypeAuthorsQuotableAPI = {
  id: string;
  name: string;
  link: string;
  bio: string;
  description: string;
  quoteCount: number;
  slug: string;
};

export type TypeAndOr = {
  label: TypeAndOrLabel;
  value: "&" | "|";
};
export type TypeAndOrLabel = "and" | "or";

export type TypeSelectedAuthors = {
  label: string;
  slug: string;
};

export type TypeSortBy = {
  label: TypeSortByLabel;
  value: "author" | "content";
};

export type TypeSortByLabel = "Author" | "Content";
