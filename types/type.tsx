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
  author: string;
  content: string;
  tags: ITag[];
  likedBy: string[];
  bookmarkedBy: string[];
  userInfo: IUserInfo | 'api';
  isDraft: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IEventInputValues {
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

export type TypeUpdateUserInputs = {
  photoURL?: string | null;
  displayName?: string;
  itemsPerPage?: number;
};

export type TypeTagsQuotableAPI = {
  name: string;
  quoteCount: number;
};
