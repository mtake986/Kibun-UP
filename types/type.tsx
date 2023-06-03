import { Timestamp } from "firebase/firestore";

export interface IEvent {
  id: string;
  description: string;
  eventDate: Timestamp;
  eventTitle: string;
  uid: string;
  createdAt: Date;
  updatedAt?: Date;
};

export interface IEventInputValues {
  description: string;
  eventTitle: string;
  eventDate: Date;
}