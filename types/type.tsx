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

export interface IFavQuote {
  qid: string;
  uids: string[];
  id?: string;
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

export interface IBookmark {
  uid: string;
  qids: string[];
  id?: string;
  quotes: IQuote[];
}

export interface INumOfBookmarks {
  qid: string;
  uids: string[];
  id?: string;
}
