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

export type TypeMyBookmarks = {
  qids: string[];
  uid: string;
  quotes: TypeQuote[];
  id?: string;
};

export type TypeNumOfBookmarks = {
  qid: string;
  uids: string[];
  id?: string;
};

export type TypeMyFavs = {
  qids: string[];
  uid: string;
  quotes: TypeQuote[];
  id?: string;
};
export type TypeNumOfFavs = {
  qid: string;
  uids: string[];
  id?: string;
};

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
}

export type TypeQuoteQuotetableAPI = {
  id: string;
  content: string;
  author: string;
  tags: string[];
};
