"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { db, auth } from "../config/Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
  setDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
type EventProviderProps = {
  children: ReactNode;
};
import { TypeEvent, TypeEventInputValues } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRandomNum } from "@/functions/functions";
import {
  displayErrorToast,
  displaySuccessToast,
} from "@/functions/displayToast";

type EventContextType = {
  handleUpdate: (
    values: TypeEventInputValues,
    eid: string,
    setIsLoading: (boo: boolean) => void
  ) => void;
  handleDelete: (id: string) => void;

  getLoginUserEvents: () => void;
  loginUserEvents: TypeEvent[] | [];

  lockThisEvent: (uid: string, data: TypeEvent) => void;
  unlockThisEvent: (uid: string) => void;
  getLockedEvent: () => void;

  lockedEvent: TypeEvent | undefined;

  randomEvent: TypeEvent | undefined;
  getRandomEvent: () => void;

  eventsNotMine: TypeEvent[] | [];
  getEventsNotMine: () => void;
  setRandomEvent: (event: TypeEvent | undefined) => void;
  setLockedEvent: (event: TypeEvent | undefined) => void;

  registerEvent: (values: TypeEventInputValues, uid: string) => Promise<void>;

  isRegisterFormOpen: boolean;
  toggleRegisterFormOpen: () => void;

  isUpdateLoading: boolean;
};

const EventContext = createContext({} as EventContextType);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: EventProviderProps) {
  const [loginUserEvents, setLoginUserEvents] = useState<TypeEvent[]>([]);

  const [lockedEvent, setLockedEvent] = useState<TypeEvent>();
  const [randomEvent, setRandomEvent] = useState<TypeEvent>();

  const [eventsNotMine, setEventsNotMine] = useState<TypeEvent[]>([]);

  const eventsCollectionRef = collection(db, "events");
  const lockedEventsCollectionRef = collection(db, "lockedEvents");
  const [user] = useAuthState(auth);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const registerEvent = async (values: TypeEventInputValues, uid: string) => {
    try {
      const currTime = serverTimestamp();
      await addDoc(eventsCollectionRef, {
        ...values,
        createdBy: uid,
        createdAt: currTime,
        updatedAt: currTime,
      });
      displaySuccessToast({
        text: "Created",
      });
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const handleUpdate = async (
    values: TypeEventInputValues,
    eid: string,
    setIsLoading: (boo: boolean) => void
  ) => {
    setIsLoading(true);
    console.log(values);
    const docRef = doc(db, "events", eid);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    });

    if (lockedEvent?.id === eid) {
      // alert(lockedEvent?.id + "," + eid);
      const lockedEventDocRef = user && doc(db, "lockedEvents", user.uid);
      if (lockedEventDocRef) {
        await updateDoc(lockedEventDocRef, {
          ...values,
          updatedAt: serverTimestamp(),
        });
      }
    }
    setTimeout(() => {
      setIsLoading(false);
      displaySuccessToast({
        text: "Updated",
      });
    }, 500);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  const getLoginUserEvents = async () => {
    if (user?.uid) {
      const q = query(
        eventsCollectionRef,
        where("createdBy", "==", user?.uid)
        // orderBy("createdAt", "asc")
      );
      onSnapshot(q, (snapshot) => {
        setLoginUserEvents(
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TypeEvent)
          )
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
    //     where("createdBy", "==", user?.uid),
    //     orderBy("eventTitle", "asc")
    //   );
    //   onSnapshot(q, (snapshot) => {
    //     setLoginUserEvents(
    //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
    //     );
    //   });
    // }
  };

  const lockThisEvent = async (uid: string, data: TypeEvent) => {
    try {
      await setDoc(doc(db, "lockedEvents", uid), {
        eid: data.id,
      });
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const unlockThisEvent = async (uid: string) => {
    try {
      await deleteDoc(doc(db, "lockedEvents", uid));
      setLockedEvent(undefined);
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const getLockedEvent = async () => {
    type TypeTempLockedEvent = { id: string; eid: string };
    let tempLockedEvent: TypeTempLockedEvent;
    if (user?.uid) {
      const q = query(lockedEventsCollectionRef);
      onSnapshot(q, (snapshot) => {
        const lockedEventDoc = snapshot.docs.find((doc) => doc.id === user.uid);
        if (lockedEventDoc) {
          tempLockedEvent = {
            ...lockedEventDoc.data(),
            id: lockedEventDoc.id,
          } as TypeTempLockedEvent;
        }
        const q = query(eventsCollectionRef);
        onSnapshot(q, (snapshot) => {
          const eventDoc = snapshot.docs.find((doc) => {
            return doc.id === tempLockedEvent?.eid;
          });
          if (eventDoc) {
            setLockedEvent({
              ...eventDoc.data(),
              id: eventDoc.id,
            } as TypeEvent);
          }
        });
      });
    }
  };

  const getRandomEvent = () => {
    let events: TypeEvent[] = [];
    if (user?.uid) {
      const q = query(eventsCollectionRef, where("createdBy", "==", user?.uid));
      onSnapshot(q, (snapshot) => {
        events = snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeEvent)
        );
        const randomNum = getRandomNum(events.length);
        const e: TypeEvent = events[randomNum];
        console.log(events, randomNum, e)
        setRandomEvent(e);
      });
    }
  };

  const getEventsNotMine = async () => {
    if (user) {
      const q = query(eventsCollectionRef, where("createdBy", "!=", user?.uid));
      onSnapshot(q, (snapshot) => {
        setEventsNotMine(
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TypeEvent)
          )
        );
      });
    }
  };

  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState<boolean>(false);
  const toggleRegisterFormOpen = () => {
    setIsRegisterFormOpen((prev) => !prev);
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

        isRegisterFormOpen,
        toggleRegisterFormOpen,

        isUpdateLoading,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
