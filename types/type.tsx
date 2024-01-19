import { Timestamp } from "firebase/firestore";

export interface TypeEvent {
  id: string;
  eventTitle: string;
  place?: string;
  description?: string;
  eventDate: Timestamp;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
  cheeredBy: string[];
  comments?: TypeComment[];
  tags?: ITag[];
}

export type TypeQuote = {
  id: string;
  author: string;
  content: string;
  tags: ITag[];
  draftStatus: string;
  likedBy: string[];
  bookmarkedBy: string[];
  createdBy: string;
  // isAPI: boolean;
  // uid?: string;
  // authorSlug?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TypeAPIQuote = TypeQuote & {
  authorSlug: string;
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
  draftStatus: string;
  tags: ITag[];
}

export interface ITag {
  name: string;
  color: string;
}

export interface TypeSortFilterBy {
  order: TypeSortOrder;
  sortByElement: string;
  searchTag: string;
}

export type TypeUserFromFirestore = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  description: string;
  createdAt: Timestamp;
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
  description?: string;
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

export type TypeTabNamesOfQuotes = "mine" | "notMine" | "api";

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

export type TypeTempLockedQuote = {
  createdBy: string;
  qid: string;
  id: string;
};

export type TypeAuthorOfAPI = {
  _id: string;
  name: string;
  bio: string;
  description: string;
  link: string;
  quoteCount: number;
  slug: string;
};

export type TypeFetchMineOrNot = "mine" | "not";
export type TypeSortOrder = "asc" | "desc";
export type TypeSortBy2 = "author" | "content" | "createdAt" | "createdBy";
export type TypeSortType = "order" | "sortBy" | "tag";

export type TypeComment = {
  createdBy: string;
  comment: string;
  createdAt: Timestamp;
  id: string;
  updatedAt?: Timestamp;
  replies?: TypeComment[];
};

export type TypeSelectedSortByForComments = "newestFirst" | "oldestFirst";

export type TypeProposal = {
  id: string;
  title: string;
  createdBy: string;
  createdAt: Timestamp;
  votedBy: string[];
  status: TypeProposalStatusValue;
  description?: string;
  updatedAt?: Timestamp;
  comments?: TypeComment[];
  labels?: string[];
};

export type TypeProposalStatusValue = "open" | "closed" | "inProgress";
export type TypeProposalStatusLabel = "Open" | "Closed" | "In Progress";

export type TypeSortFilterVariablesEvents = {
  sortBy: string;
  order: "desc" | "asc";
  isTagDisabled: boolean;
  searchTagName: string;
};
