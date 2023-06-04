import { Timestamp } from "firebase/firestore";

export interface IEvent {
  id: string;
  eventTitle: string;
  place: string;
  description: string;
  eventDate: Timestamp;
  uid: string;
  createdAt: Date;
  updatedAt?: Date;
};

export interface IEventInputValues {
  eventTitle: string;
  place?: string;
  description: string;
  eventDate: Date;
}