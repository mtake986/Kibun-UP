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
  addDoc,
} from "firebase/firestore";
type EventProviderProps = {
  children: ReactNode;
};
import { TypeEvent, TypeEventInputValues, IUserInfo } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRandomNum } from "@/functions/functions";
import { displaySuccessToast } from "@/functions/displayToast";

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

  registerEvent: (values: TypeEventInputValues, userInfo: IUserInfo) => void;

  isRegisterFormOpen: boolean;
  toggleRegisterFormOpen: () => void;
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

  const registerEvent = async (
    values: TypeEventInputValues,
    userInfo: IUserInfo
  ) => {
    await addDoc(eventCollectionRef, {
      ...values,
      userInfo,
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
    console.log(values)
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
    displaySuccessToast({
      text: "Updated",
    });
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
        setLockedEvent(snapshot.docs[0]?.data() as TypeEvent);
      });
    }
  };

  const getRandomEvent = async () => {
    if (user) {
      const q = query(
        eventCollectionRef,
        where("userInfo.uid", "==", user.uid)
      );
      onSnapshot(q, (snapshot) => {
        const randomNum = getRandomNum(snapshot.docs.length);
        const doc = snapshot.docs[randomNum];
        if (doc) setRandomEvent({ ...doc.data(), id: doc.id } as TypeEvent);
      });
    }
  };

  const getEventsNotMine = async () => {
    if (user) {
      const q = query(
        eventCollectionRef,
        where("userInfo.uid", "!=", user?.uid)
      );
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
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
