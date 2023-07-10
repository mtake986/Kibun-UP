"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { db, auth } from "../config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
type EventProviderProps = {
  children: ReactNode;
};
import { IEvent, IEventInputValues } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";

type EventContext = {
  handleEditMode: () => void;
  editModeOn: boolean;
  handleSave: (id: string, values: IEventInputValues) => void;
  handleCancelEdit: () => void;
  handleDelete: (id: string) => void;

  getLoginUserEvents: () => void;
  loginUserEvents: IEvent[] | [];
};

const EventContext = createContext({} as EventContext);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: EventProviderProps) {
  const handleEditMode = () => {
    setEditModeOn(true);
  };

  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [eventInput, setEventInput] = useState<IEvent>();
  const [date, setDate] = useState<Date>();
  const [loginUserEvents, setLoginUserEvents] = useState<IEvent[]>([]);

  const handleSave = async (id: string, values: IEventInputValues) => {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    }).then(() => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Updated",
        description: `
            Event Title: ${values.eventTitle}, 
            Place: ${values.place}, 
            Event Date: ${values.eventDate.toDateString()},
            Description: ${values.description},
            Target: ${values.target},
          `,
      });
      setEditModeOn(false);
    });
  };

  const handleCancelEdit = () => {
    setEditModeOn(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  const [user] = useAuthState(auth);

  const getLoginUserEvents = async () => {
    const collectionRef = collection(db, "events");
    if (user?.uid) {
      const q = query(
        collectionRef,
        where("uid", "==", user?.uid),
        orderBy("eventTitle", "asc")
      );
      onSnapshot(q, (snapshot) => {
        setLoginUserEvents(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IEvent))
        );
      });
    }
  };

  return (
    <EventContext.Provider
      value={{
        handleEditMode,
        editModeOn,
        handleSave,
        handleCancelEdit,
        handleDelete,
        getLoginUserEvents,
        loginUserEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
