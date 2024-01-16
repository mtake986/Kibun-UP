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
  getDoc,
  arrayUnion,
  arrayRemove,
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
  handleUpdate: (values: TypeEventInputValues, eid: string) => Promise<void>;
  handleDelete: (id: string) => void;

  getLoginUserEventsWithSort: () => Promise<void>;
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
  fetchProfileUserEvents: (uid: string) => Promise<void>;
  profileUserEvents: TypeEvent[] | [];

  cheerEvent: (uid: string, event: TypeEvent) => Promise<void>;
  removeCheerFromEvent: (uid: string, event: TypeEvent) => Promise<void>;

  handleSortFilterVariablesMyEventsElement: (element: string) => void;
  handleSortFilterVariablesMyEventsOrder: (order: "desc" | "asc") => void;
  SortFilterVariablesForMyEvents: { element: string; order: "desc" | "asc" };
  resetSortFilterVariablesForMyEvents: () => void;
  isSortFilterVariablesForMyEventsDefault: boolean;
  checkSortFilterVariablesForMyEventsDefault: () => void;
  getLoginUserEventsDefault: () => Promise<void>;

  handleSortFilterVariablesNotMyEventsElement: (sortBy: string) => void;
  handleSortFilterVariablesNotMyEventsOrder: (order: "desc" | "asc") => void;
  SortFilterVariablesForEventsOtherThanLoginUser: {
    sortBy: string;
    order: "desc" | "asc";
  };
  isSortFilterVariablesForEventsOtherThanLoginUserDefault: boolean;
  getEventsOtherThanLoginUserWithSort: () => Promise<void>;
  checkSortFilterVariablesForNotMyEventsDefault: () => void;
  resetSortFilterVariablesForNotMyEvents: () => void;

  AreMyPastEventsRemoved: boolean;
  setAreMyPastEventsRemoved: React.Dispatch<React.SetStateAction<boolean>>;

  AreNotMyPastEventsRemoved: boolean;
  setAreNotMyPastEventsRemoved: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventContext = createContext({} as EventContextType);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }: EventProviderProps) {
  // ======================
  // states
  // ======================
  const [loginUserEvents, setLoginUserEvents] = useState<TypeEvent[]>([]);
  const [lockedEvent, setLockedEvent] = useState<TypeEvent>();
  const [randomEvent, setRandomEvent] = useState<TypeEvent>();
  const [eventsNotMine, setEventsNotMine] = useState<TypeEvent[]>([]);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState<boolean>(false);
  const [profileUserEvents, setProfileUserEvents] = useState<TypeEvent[]>([]);
  const eventsCollectionRef = collection(db, "events");
  const lockedEventsCollectionRef = collection(db, "lockedEvents");
  const [user] = useAuthState(auth);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [
    isSortFilterVariablesForMyEventsDefault,
    setIsSortFilterVariablesForMyEventsDefault,
  ] = useState(true);
  const [SortFilterVariablesForMyEvents, setSortFilterVariablesForMyEvents] =
    useState<{
      element: string;
      order: "desc" | "asc";
    }>({ element: "createdAt", order: "desc" });

  const [
    SortFilterVariablesForEventsOtherThanLoginUser,
    setSortFilterVariablesForEventsOtherThanLoginUser,
  ] = useState<{
    sortBy: string;
    order: "desc" | "asc";
  }>({ sortBy: "createdAt", order: "desc" });
  const [
    isSortFilterVariablesForEventsOtherThanLoginUserDefault,
    setIsSortFilterVariablesForEventsOtherThanLoginUserDefault,
  ] = useState<boolean>(true);

  const [AreMyPastEventsRemoved, setAreMyPastEventsRemoved] =
    useState<boolean>(false);
  const [AreNotMyPastEventsRemoved, setAreNotMyPastEventsRemoved] =
    useState<boolean>(false);


  // ======================
  // functions
  // ======================
  const getLoginUserEventsDefault = async () => {
    if (user?.uid) {
      const q = query(
        eventsCollectionRef,
        // where("createdBy", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        setLoginUserEvents(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
            .filter((doc) => doc.createdBy === user?.uid)
        );
      });
    }
  };

  const getLoginUserEventsWithSort = async () => {
    if (user?.uid) {
      const q = query(
        eventsCollectionRef,
        // where("createdBy", "==", user?.uid),
        orderBy(
          SortFilterVariablesForMyEvents.element,
          SortFilterVariablesForMyEvents.order
        )
      );
      onSnapshot(q, (snapshot) => {
        // Get the current date
        const today = new Date();

        // Get yesterday's date
        const yesterday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1
        );

        let tempEvents: TypeEvent[] = AreMyPastEventsRemoved
          ? snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
              .filter((doc) => doc.createdBy === user?.uid)
              .filter((doc) => doc.eventDate.toDate() >= yesterday)
          : snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
              .filter((doc) => doc.createdBy === user?.uid);

        setLoginUserEvents(tempEvents);
      });
    }
  };

  const registerEvent = async (values: TypeEventInputValues, uid: string) => {
    try {
      const currTime = serverTimestamp();
      await addDoc(eventsCollectionRef, {
        ...values,
        createdBy: uid,
        createdAt: currTime,
        updatedAt: currTime,
        cheeredBy: [],
      });
      displaySuccessToast({
        text: "Created",
      });
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const handleUpdate = async (values: TypeEventInputValues, eid: string) => {
    const docRef = doc(db, "events", eid);
    try {
      await updateDoc(docRef, {
        ...values,
        updatedAt: serverTimestamp(),
      });
      displaySuccessToast({
        text: "Updated",
      });
    } catch (error) {
      displayErrorToast(error);
    }

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
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
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

  const toggleRegisterFormOpen = () => {
    setIsRegisterFormOpen((prev) => !prev);
  };

  const fetchProfileUserEvents = async (uid: string) => {
    const q = query(eventsCollectionRef, where("createdBy", "==", uid));

    const querySnapshot = await getDocs(q);
    let es: TypeEvent[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      es.push({ ...doc.data(), id: doc.id } as TypeEvent);
    });

    setProfileUserEvents(es);
  };

  const cheerEvent = async (uid: string, event: TypeEvent) => {
    const eventDocRef = doc(db, "events", event.id);
    const eventDocSnap = await getDoc(eventDocRef);
    if (eventDocSnap.exists()) {
      await updateDoc(eventDocRef, {
        cheeredBy: arrayUnion(uid),
      });
    }
  };

  const removeCheerFromEvent = async (uid: string, event: TypeEvent) => {
    const eventDocRef = doc(db, "events", event.id);
    const eventDocSnap = await getDoc(eventDocRef);
    if (eventDocSnap.exists()) {
      await updateDoc(eventDocRef, {
        cheeredBy: arrayRemove(uid),
      });
    }
  };

  const handleSortFilterVariablesMyEventsElement = (element: string) => {
    setSortFilterVariablesForMyEvents((prev) => ({ ...prev, element }));
  };

  const handleSortFilterVariablesMyEventsOrder = (order: "desc" | "asc") => {
    setSortFilterVariablesForMyEvents((prev) => ({ ...prev, order }));
  };

  const checkSortFilterVariablesForMyEventsDefault = () => {
    if (
      SortFilterVariablesForMyEvents.element === "createdAt" &&
      SortFilterVariablesForMyEvents.order === "desc"
    ) {
      setIsSortFilterVariablesForMyEventsDefault(true);
    } else {
      setIsSortFilterVariablesForMyEventsDefault(false);
    }
  };

  const resetSortFilterVariablesForMyEvents = () => {
    setSortFilterVariablesForMyEvents({ element: "createdAt", order: "desc" });
    setIsSortFilterVariablesForMyEventsDefault(true);
    getLoginUserEventsDefault();
  };

  const handleSortFilterVariablesNotMyEventsElement = (sortBy: string) => {
    setSortFilterVariablesForEventsOtherThanLoginUser((prev) => ({
      ...prev,
      sortBy,
    }));
  };

  const handleSortFilterVariablesNotMyEventsOrder = (order: "desc" | "asc") => {
    setSortFilterVariablesForEventsOtherThanLoginUser((prev) => ({
      ...prev,
      order,
    }));
  };

  const getEventsOtherThanLoginUserWithSort = async () => {
    if (user?.uid) {
      const q = query(
        eventsCollectionRef,
        orderBy(
          SortFilterVariablesForEventsOtherThanLoginUser.sortBy,
          SortFilterVariablesForEventsOtherThanLoginUser.order
        )
      );
      onSnapshot(q, (snapshot) => {
        // Get the current date
        const today = new Date();

        // Get yesterday's date
        const yesterday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1
        );

        let tempEvents: TypeEvent[] = AreNotMyPastEventsRemoved
          ? snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
              .filter((doc) => doc.createdBy !== user?.uid)
              .filter((doc) => doc.eventDate.toDate() >= yesterday)
          : snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
              .filter((doc) => doc.createdBy !== user?.uid);
        setEventsNotMine(tempEvents);
      });
    }
  };

  const checkSortFilterVariablesForNotMyEventsDefault = () => {
    if (
      SortFilterVariablesForEventsOtherThanLoginUser.sortBy === "createdAt" &&
      SortFilterVariablesForEventsOtherThanLoginUser.order === "desc"
    ) {
      setIsSortFilterVariablesForEventsOtherThanLoginUserDefault(true);
    } else {
      setIsSortFilterVariablesForEventsOtherThanLoginUserDefault(false);
    }
  };

  const resetSortFilterVariablesForNotMyEvents = () => {
    setSortFilterVariablesForEventsOtherThanLoginUser({
      sortBy: "createdAt",
      order: "desc",
    });
    setIsSortFilterVariablesForEventsOtherThanLoginUserDefault(true);
    getEventsNotMine();
  };

  return (
    <EventContext.Provider
      value={{
        handleUpdate,
        handleDelete,
        getLoginUserEventsWithSort,
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
        fetchProfileUserEvents,
        profileUserEvents,
        cheerEvent,
        removeCheerFromEvent,

        handleSortFilterVariablesMyEventsElement,
        handleSortFilterVariablesMyEventsOrder,
        SortFilterVariablesForMyEvents,
        resetSortFilterVariablesForMyEvents,
        isSortFilterVariablesForMyEventsDefault,
        checkSortFilterVariablesForMyEventsDefault,
        getLoginUserEventsDefault,

        handleSortFilterVariablesNotMyEventsElement,
        handleSortFilterVariablesNotMyEventsOrder,
        SortFilterVariablesForEventsOtherThanLoginUser,
        isSortFilterVariablesForEventsOtherThanLoginUserDefault,
        getEventsOtherThanLoginUserWithSort,
        checkSortFilterVariablesForNotMyEventsDefault,
        resetSortFilterVariablesForNotMyEvents,

        AreMyPastEventsRemoved,
        setAreMyPastEventsRemoved,
        AreNotMyPastEventsRemoved,
        setAreNotMyPastEventsRemoved,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
