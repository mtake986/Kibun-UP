import { Timestamp } from "firebase/firestore";

export interface IEvent {
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
  person: string;
  quote: string;
  isDraft: boolean;
  createdAt: Date;
  userInfo: IUserInfo;
  updatedAt?: Date;
  tags: ITag[];
  likedBy: string[],
  bookmarkedBy: string[],
};

export interface IEventInputValues {
  eventTitle: string;
  place?: string;
  description?: string;
  eventDate: Date;
}

export interface TypeQuoteInputValues {
  person: string;
  quote: string;
  isDraft: boolean;
  tags: ITag[];
}

export interface IUserInfo {
  uid: string | undefined;
  displayName: string | null | undefined;
  photoUrl: string | null | undefined;
}

export interface ITag {
  tag: string;
  tagColor: string;
}

export interface ISortFilterBy {
  order: string;
  sortByElement: string;
  searchTag: string;
}

export interface TypeLoginUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  settings: {
    itemsPerPage: number;
    tagForQuotableApi: string;
    quoteTypeForHome: "bookmarks" | "mine" | "appChoice";
  };
}

export type typeQuoteFromAPI = {
  quote: string;
  author: string;
  category: string;
};

export type TypeUpdateUserInputs = {
  photoURL?: string | null;
  displayName?: string;
  itemsPerPage?: number;
};

export type TypeTagsQuotableAPI = {
  name: string;
  quoteCount: number;
}

export type TypeQuoteQuotetableAPI = {
  id: string;
  content: string;
  author: string;
  tags: string[];
};
