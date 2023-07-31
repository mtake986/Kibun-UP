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
  setDoc,
  getDoc,
} from "firebase/firestore";
type EventProviderProps = {
  children: ReactNode;
};
import { IEvent, IEventInputValues } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "@/utils/functions";

type EventContextType = {
  handleEditMode: () => void;
  editModeOn: boolean;
  handleUpdate: (values: IEventInputValues, id: string) => void;
  handleCancelEdit: () => void;
  handleDelete: (id: string) => void;

  getLoginUserEvents: () => void;
  loginUserEvents: IEvent[] | [];

  lockThisEvent: (data: IEvent) => void;
  unlockThisEvent: () => void;
  getLockedEvent: () => void;

  lockedEvent: IEvent | undefined;

  randomEvent: IEvent | undefined;
  getRandomEvent: (uid: string) => void;

  eventsNotMine: IEvent[] | [];
  getEventsNotMine: () => void;
  setRandomEvent: (event: IEvent | undefined) => void;
  setLockedEvent: (event: IEvent | undefined) => void;
};

const EventContext = createContext({} as EventContextType);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: EventProviderProps) {
  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [loginUserEvents, setLoginUserEvents] = useState<IEvent[]>([]);

  const [lockedEvent, setLockedEvent] = useState<IEvent>();
  const [randomEvent, setRandomEvent] = useState<IEvent>();

  const [eventsNotMine, setEventsNotMine] = useState<IEvent[]>([]);

  const eventCollectionRef = collection(db, "events");
  const [user] = useAuthState(auth);

  const handleEditMode = () => {
    setEditModeOn(true);
  };

  const handleUpdate = async (values: IEventInputValues, eid: string) => {
    const docRef = doc(db, "events", eid);
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
          `,
      });
    });
    const lockedEventDocRef = user && doc(db, "lockedEvents", user.uid);
    if (lockedEventDocRef) {
      await updateDoc(lockedEventDocRef, {
        ...values,
        updatedAt: serverTimestamp(),
      });
    }
  };

  const handleCancelEdit = () => {
    setEditModeOn(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

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

  const filterEvents = async (type: string) => {
    if (loginUserEvents.length > 0) {
    }
    // const collectionRef = collection(db, "events");
    // if (user?.uid) {
    //   const q = query(
    //     collectionRef,
    //     where("uid", "==", user?.uid),
    //     orderBy("eventTitle", "asc")
    //   );
    //   onSnapshot(q, (snapshot) => {
    //     setLoginUserEvents(
    //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IEvent))
    //     );
    //   });
    // }
  };

  const lockThisEvent = async (data: IEvent) => {
    if (user?.uid) {
      await setDoc(doc(db, "lockedEvents", user.uid), data);
      setLockedEvent(data);
    } else {
      alert(
        "You need to login to lock this event. Please login with Google account."
      );
    }
    // toast({
    //   className: "border-none bg-red-50 text-red-500",
    //   title: "Quote locked",
    // });
  };

  const unlockThisEvent = async () => {
    if (user?.uid) {
      console.log(user, "in unlock ");
      await deleteDoc(doc(db, "lockedEvents", user.uid));
      setLockedEvent(undefined);
    } else {
      alert(
        "You need to login to unlock this event. Please login with Google account."
      );
    }
    // toast({
    //   className: "border-none bg-red-50 text-red-500",
    //   title: "Quote Unlocked",
    // });
  };

  const getLockedEvent = async () => {
    if (user?.uid) {
      const docRef = doc(db, "lockedEvents", user.uid);
      const docSnap = await getDoc(docRef);
      setLockedEvent(docSnap.data() as IEvent);
      console.log(docSnap.data());
    }
  };

  const getRandomEvent = async (uid: string) => {
    console.log("getRandom EVENT started", uid);
    const q = query(eventCollectionRef, where("uid", "==", user?.uid));
    onSnapshot(q, (snapshot) => {
      const randomNum = getRandomNum(snapshot.docs.length);
      const doc = snapshot.docs[randomNum];
      if (doc) setRandomEvent({ ...doc.data(), id: doc.id } as IEvent);
    });
  };

  const getEventsNotMine = async () => {
    const q = (user?.uid) ? query(eventCollectionRef, where("uid", "!=", user?.uid)) : eventCollectionRef;
    onSnapshot(q, (snapshot) => {
      setEventsNotMine(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IEvent))
      );
    });
  };

  return (
    <EventContext.Provider
      value={{
        handleEditMode,
        editModeOn,
        handleUpdate,
        handleCancelEdit,
        handleDelete,
        getLoginUserEvents,
        loginUserEvents,
        lockThisEvent,
        unlockThisEvent,
        getLockedEvent,
        lockedEvent,
        randomEvent,
        getRandomEvent,
        eventsNotMine,
        getEventsNotMine,
        setRandomEvent,
        setLockedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
