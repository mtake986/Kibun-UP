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

  lockThisEvent: (data: TypeEvent) => void;
  unlockThisEvent: () => void;
  getLockedEvent: () => void;

  lockedEvent: TypeEvent | undefined;

  randomEvent: TypeEvent | undefined;
  getRandomEvent: () => void;

  eventsNotMine: TypeEvent[] | [];
  getEventsNotMine: () => void;
  setRandomEvent: (event: TypeEvent | undefined) => void;
  setLockedEvent: (event: TypeEvent | undefined) => void;

  registerEvent: (values: TypeEventInputValues, uid: string) => void;

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

  const eventCollectionRef = collection(db, "events");
  const lockedEventsCollectionRef = collection(db, "lockedEvents");
  const [user] = useAuthState(auth);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const registerEvent = async (
    values: TypeEventInputValues,
    uid: string
  ) => {
    await addDoc(eventCollectionRef, {
      ...values,
      uid,
      createdAt: serverTimestamp(),
    }).then(() => {
      displaySuccessToast({
        text: "Created",
      });
    });
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
        eventCollectionRef,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "asc")
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
    //     where("uid", "==", user?.uid),
    //     orderBy("eventTitle", "asc")
    //   );
    //   onSnapshot(q, (snapshot) => {
    //     setLoginUserEvents(
    //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
    //     );
    //   });
    // }
  };

  const lockThisEvent = async (data: TypeEvent) => {
    try {
      user && (await setDoc(doc(db, "lockedEvents", user?.uid), data));
      setLockedEvent(data);
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const unlockThisEvent = async () => {
    try {
      user && (await deleteDoc(doc(db, "lockedEvents", user?.uid)));
      setLockedEvent(undefined);
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const getLockedEvent = async () => {
    if (user?.uid) {
      const q = query(lockedEventsCollectionRef, where("uid", "==", user?.uid));
      onSnapshot(q, (snapshot) => {
        setLockedEvent(snapshot.docs[0]?.data() as TypeEvent);
      });
    }
  };

  const getRandomEvent = async () => {
    if (user) {
      const q = query(eventCollectionRef, where("uid", "==", user.uid));
      onSnapshot(q, (snapshot) => {
        const randomNum = getRandomNum(snapshot.docs.length);
        const doc = snapshot.docs[randomNum];
        console.log(snapshot, doc)
        if (doc) setRandomEvent({ ...doc.data(), id: doc.id } as TypeEvent);
      });
    }
  };

  const getEventsNotMine = async () => {
    if (user) {
      const q = query(eventCollectionRef, where("uid", "!=", user?.uid));
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
