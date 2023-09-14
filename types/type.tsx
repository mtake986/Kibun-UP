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

export interface IQuote {
  id: string;
  person: string;
  quote: string;
  isDraft: boolean;
  createdAt: Date;
  userInfo: IUserInfo;
  updatedAt?: Date;
  tags?: ITag[];
}

export interface IEventInputValues {
  eventTitle: string;
  place?: string;
  description?: string;
  eventDate: Date;
}

export interface IQuoteInputValues {
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
  quotes: IQuote[];
  id?: string;
}

export type TypeNumOfBookmarks = {
  qid: string;
  uids: string[];
  id?: string;
}

export type TypeMyFavs = {
  qids: string[];
  uid: string;
  quotes: IQuote[];
  id?: string;
}
export type TypeNumOfFavs = {
  qid: string;
  uids: string[];
  id?: string;
}

export interface ILoginUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  displayWhichQuoteType: string;
  paginationNum: number;
}

export type TypeLockedQuote = {
  q: IQuote, 
  uid: string,
}

export type TypeQuoteFromAPI = {
  content: string;
  author: string;
}