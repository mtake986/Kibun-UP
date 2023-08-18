"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { db, auth } from "../app/config/Firebase";
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
  addDoc,
} from "firebase/firestore";
type EventProviderProps = {
  children: ReactNode;
};
import { IEvent, IEventInputValues, IUserInfo } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "@/utils/functions";

type EventContextType = {
  handleUpdate: (
    values: IEventInputValues,
    eid: string,
    setIsLoading: (boo: boolean) => void
  ) => void;
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

  registerEvent: (values: IEventInputValues, userInfo: IUserInfo) => void;
};

const EventContext = createContext({} as EventContextType);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: EventProviderProps) {
  const [loginUserEvents, setLoginUserEvents] = useState<IEvent[]>([]);

  const [lockedEvent, setLockedEvent] = useState<IEvent>();
  const [randomEvent, setRandomEvent] = useState<IEvent>();

  const [eventsNotMine, setEventsNotMine] = useState<IEvent[]>([]);

  const eventCollectionRef = collection(db, "events");
  const lockedEventsCollectionRef = collection(db, "lockedEvents");
  const [user] = useAuthState(auth);

  const registerEvent = async (
    values: IEventInputValues,
    userInfo: IUserInfo
  ) => {
    await addDoc(eventCollectionRef, {
      ...values,
      userInfo,
      createdAt: serverTimestamp(),
    }).then(() => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Created",
        description: `
            Event Title: ${values.eventTitle}, 
            Place: ${values.place}, 
            Description: ${values.description},
            Event Date: ${values.eventDate.toLocaleDateString("en-US")},
          `,
      });
    });
  };

  const handleUpdate = async (
    values: IEventInputValues,
    eid: string,
    setIsLoading: (boo: boolean) => void
  ) => {
    setIsLoading(true);
    const docRef = doc(db, "events", eid);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    });

    if (lockedEvent?.id === eid) {
      alert(lockedEvent?.id + "," + eid);
      const lockedEventDocRef = user && doc(db, "lockedEvents", user.uid);
      if (lockedEventDocRef) {
        await updateDoc(lockedEventDocRef, {
          ...values,
          updatedAt: serverTimestamp(),
        });
      }
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  const getLoginUserEvents = async () => {
    if (user?.uid) {
      const q = query(
        eventCollectionRef,
        where("userInfo.uid", "==", user?.uid),
        orderBy("createdAt", "asc")
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
    user && (await setDoc(doc(db, "lockedEvents", user?.uid), data));
    setLockedEvent(data);
  };

  const unlockThisEvent = async () => {
    user && (await deleteDoc(doc(db, "lockedEvents", user?.uid)));
    setLockedEvent(undefined);
  };

  const getLockedEvent = async () => {
    if (user?.uid) {
      const q = query(
        lockedEventsCollectionRef,
        where("userInfo.uid", "==", user?.uid)
      );
      onSnapshot(q, (snapshot) => {
        setLockedEvent(snapshot.docs[0]?.data() as IEvent);
      });
    }
  };

  const getRandomEvent = async (uid: string) => {
    const q = query(eventCollectionRef, where("userInfo.uid", "==", user?.uid));
    onSnapshot(q, (snapshot) => {
      const randomNum = getRandomNum(snapshot.docs.length);
      const doc = snapshot.docs[randomNum];
      if (doc) setRandomEvent({ ...doc.data(), id: doc.id } as IEvent);
    });
  };

  const getEventsNotMine = async () => {
    const q = user?.uid
      ? query(eventCollectionRef, where("userInfo.uid", "!=", user?.uid))
      : eventCollectionRef;
    onSnapshot(q, (snapshot) => {
      setEventsNotMine(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IEvent))
      );
    });
  };

  return (
    <EventContext.Provider
      value={{
        handleUpdate,
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
        registerEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
