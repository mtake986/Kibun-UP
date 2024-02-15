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
import {
  TypeEvent,
  TypeEventInputValues,
  TypeSortFilterVariablesEvents,
  TypeTypeSortFilterVariablesEventsRemove,
} from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRandomNum } from "@/functions/functions";
import {
  displayErrorToast,
  displaySuccessToast,
} from "@/functions/displayToast";
import { SORT_FILTER_VARIABLES_EVENTS } from "@/data/CONSTANTS";

type EventContextType = {
  handleUpdate: (values: TypeEventInputValues, eid: string) => Promise<void>;
  handleDelete: (id: string) => void;
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

  fetchProfileUserEvents: (uid: string) => Promise<void>;
  profileUserEvents: TypeEvent[] | [];

  cheerEvent: (uid: string, event: TypeEvent) => Promise<void>;
  removeCheerFromEvent: (uid: string, event: TypeEvent) => Promise<void>;

  // my events sort filter varialbes
  handleSortFilterVariablesMyEventsElement: (element: string) => void;
  handleSortFilterVariablesMyEventsOrder: (order: "desc" | "asc") => void;
  sortFilterVariablesForMyEvents: TypeSortFilterVariablesEvents;
  resetSortFilterVariablesForMyEvents: () => void;
  isSortFilterVariablesForMyEventsDefault: boolean;
  checkSortFilterVariablesForMyEventsDefault: () => void;
  getLoginUserEventsDefault: () => Promise<void>;
  handleSortFilterVariablesMyEventsTagDisabled: () => void;
  handleSortFilterVariablesMyEventsSearchTagName: (tagName: string) => void;
  handleSortFilterVariablesMyEventsDisplayOnly: (
    removeType: TypeTypeSortFilterVariablesEventsRemove
  ) => void;

  // not my events sort filter varialbes
  handleSortFilterVariablesNotMyEventsElement: (sortBy: string) => void;
  handleSortFilterVariablesNotMyEventsOrder: (order: "desc" | "asc") => void;
  sortFilterVariablesForEventsOtherThanLoginUser: TypeSortFilterVariablesEvents;
  isSortFilterVariablesForEventsOtherThanLoginUserDefault: boolean;
  getEventsOtherThanLoginUserWithSort: () => Promise<void>;
  checkSortFilterVariablesForNotMyEventsDefault: () => void;
  resetSortFilterVariablesForNotMyEvents: () => void;
  handleSortFilterVariablesNotMyEventsDisplayOnly: (
    removeType: TypeTypeSortFilterVariablesEventsRemove
  ) => void;

  areMyPastEventsRemoved: boolean;
  setAreMyPastEventsRemoved: React.Dispatch<React.SetStateAction<boolean>>;

  areNotMyPastEventsRemoved: boolean;
  setAreNotMyPastEventsRemoved: React.Dispatch<React.SetStateAction<boolean>>;

  getEventsWithSortAndFilter: (
    who: "loginUser" | "notLoginUser"
  ) => Promise<void>;
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
  const [
    isSortFilterVariablesForMyEventsDefault,
    setIsSortFilterVariablesForMyEventsDefault,
  ] = useState(true);
  const [sortFilterVariablesForMyEvents, setSortFilterVariablesForMyEvents] =
    useState<TypeSortFilterVariablesEvents>(SORT_FILTER_VARIABLES_EVENTS);

  const [
    sortFilterVariablesForEventsOtherThanLoginUser,
    setSortFilterVariablesForEventsOtherThanLoginUser,
  ] = useState<TypeSortFilterVariablesEvents>(SORT_FILTER_VARIABLES_EVENTS);
  const [
    isSortFilterVariablesForEventsOtherThanLoginUserDefault,
    setIsSortFilterVariablesForEventsOtherThanLoginUserDefault,
  ] = useState<boolean>(true);

  const [areMyPastEventsRemoved, setAreMyPastEventsRemoved] =
    useState<boolean>(false);
  const [areNotMyPastEventsRemoved, setAreNotMyPastEventsRemoved] =
    useState<boolean>(false);

  // ======================
  // functions
  // ======================
  // const getLoginUserEventsDefault = async () => {
  //   if (user?.uid) {
  //     const q = query(
  //       eventsCollectionRef,
  //       // where("createdBy", "==", user?.uid),
  //       orderBy("createdAt", "desc")
  //     );

  //     onSnapshot(q, (snapshot) => {
  //       setLoginUserEvents(
  //         snapshot.docs
  //           .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
  //           .filter((doc) => doc.createdBy === user?.uid)
  //       );
  //     });
  //   }
  // };

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
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
    setLoginUserEvents(loginUserEvents.filter((event) => event.id !== id));
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
        } else {
          setLockedEvent(undefined);
          return;
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

  const getLoginUserEventsDefault = async () => {
    if (user?.uid) {
      const q = query(eventsCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      let es: TypeEvent[] = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id } as TypeEvent))
        .filter((doc) => doc.createdBy === user?.uid);

      setLoginUserEvents(es);
    }
  };

  const getEventsWithSortAndFilter = async (
    who: "loginUser" | "notLoginUser"
  ) => {
    if (user?.uid) {
      const q = query(
        eventsCollectionRef,
        // where("createdBy", "==", user?.uid),
        orderBy(
          sortFilterVariablesForMyEvents.sortBy,
          sortFilterVariablesForMyEvents.order
        )
      );
      const querySnapshot = await getDocs(q);
      // Get the current date
      const today = new Date();

      // Get yesterday's date
      const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      let tempEvents: TypeEvent[] = [];
      querySnapshot.forEach((doc) => {
        // No need to filter by tag
        if (sortFilterVariablesForMyEvents.isTagDisabled) {
          tempEvents.push({ ...doc.data(), id: doc.id } as TypeEvent);
        }
        // If searchTag is empty, leave quotes who have no tags
        else if (sortFilterVariablesForMyEvents.searchTagName === "") {
          if (doc.data().tags?.length === 0) {
            tempEvents.push({ ...doc.data(), id: doc.id } as TypeEvent);
          }
        }
        // If searchTag is not empty, filter by searchTag
        else {
          if (
            doc
              .data()
              .tags?.some(
                (tag: { color: string; name: string }) =>
                  tag.name === sortFilterVariablesForMyEvents.searchTagName
              )
          ) {
            tempEvents.push({ ...doc.data(), id: doc.id } as TypeEvent);
          }
        }
      });

      if (who === "loginUser") {
        tempEvents = tempEvents.filter((q) => q.createdBy === user?.uid);
        if (sortFilterVariablesForMyEvents.displayOnly.length === 0) {
          setLoginUserEvents([]);
        } else if (sortFilterVariablesForMyEvents.displayOnly.length === 1) {
          if (sortFilterVariablesForMyEvents.displayOnly.includes("future")) {
            tempEvents = tempEvents.filter(
              (doc) => doc.eventDate.toDate() >= yesterday
            );
          }
          if (sortFilterVariablesForMyEvents.displayOnly.includes("past")) {
            tempEvents = tempEvents.filter(
              (doc) => doc.eventDate.toDate() < yesterday
            );
          }
          setLoginUserEvents(tempEvents);
        } else {
          setLoginUserEvents(tempEvents);
        }
      } else {
        tempEvents = tempEvents.filter((q) => q.createdBy !== user?.uid);
        if (
          sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.length ===
          0
        ) {
          setEventsNotMine([]);
        } else if (
          sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.length ===
          1
        ) {
          if (
            sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.includes(
              "future"
            )
          ) {
            tempEvents = tempEvents.filter(
              (doc) => doc.eventDate.toDate() >= yesterday
            );
          }
          if (
            sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.includes(
              "past"
            )
          ) {
            tempEvents = tempEvents.filter(
              (doc) => doc.eventDate.toDate() < yesterday
            );
          }
          setEventsNotMine(tempEvents);
        } else {
          setEventsNotMine(tempEvents);
        }
      }
    }
  };

  // My events variables
  const handleSortFilterVariablesMyEventsElement = (sortBy: string) => {
    setSortFilterVariablesForMyEvents((prev) => ({ ...prev, sortBy }));
  };
  const handleSortFilterVariablesMyEventsOrder = (order: "desc" | "asc") => {
    setSortFilterVariablesForMyEvents((prev) => ({ ...prev, order }));
  };
  const handleSortFilterVariablesMyEventsTagDisabled = () => {
    setSortFilterVariablesForMyEvents({
      ...sortFilterVariablesForMyEvents,
      isTagDisabled: !sortFilterVariablesForMyEvents.isTagDisabled,
    });
  };
  const checkSortFilterVariablesForMyEventsDefault = () => {
    if (
      sortFilterVariablesForMyEvents.sortBy ===
        SORT_FILTER_VARIABLES_EVENTS.sortBy &&
      sortFilterVariablesForMyEvents.order ===
        SORT_FILTER_VARIABLES_EVENTS.order &&
      sortFilterVariablesForMyEvents.isTagDisabled ===
        SORT_FILTER_VARIABLES_EVENTS.isTagDisabled &&
      sortFilterVariablesForMyEvents.displayOnly.length === 2
    ) {
      setIsSortFilterVariablesForMyEventsDefault(true);
    } else {
      setIsSortFilterVariablesForMyEventsDefault(false);
    }
  };
  const resetSortFilterVariablesForMyEvents = () => {
    setSortFilterVariablesForMyEvents(SORT_FILTER_VARIABLES_EVENTS);
    setIsSortFilterVariablesForMyEventsDefault(true);
    setAreMyPastEventsRemoved(false);
    getLoginUserEventsDefault();
  };
  const handleSortFilterVariablesMyEventsSearchTagName = (tagName: string) => {
    setSortFilterVariablesForMyEvents({
      ...sortFilterVariablesForMyEvents,
      searchTagName: tagName,
    });
  };
  const handleSortFilterVariablesMyEventsDisplayOnly = (
    removeType: TypeTypeSortFilterVariablesEventsRemove
  ) => {
    if (sortFilterVariablesForMyEvents.displayOnly.includes(removeType)) {
      const index =
        sortFilterVariablesForMyEvents.displayOnly.indexOf(removeType);
      const newRemoveArray = [...sortFilterVariablesForMyEvents.displayOnly];
      newRemoveArray.splice(index, 1);

      setSortFilterVariablesForMyEvents((prev) => ({
        ...prev,
        displayOnly: newRemoveArray,
      }));
    } else {
      setSortFilterVariablesForMyEvents((prev) => ({
        ...prev,
        displayOnly: prev.displayOnly.concat(removeType),
      }));
    }
  };

  // Not my events variables
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
          sortFilterVariablesForEventsOtherThanLoginUser.sortBy,
          sortFilterVariablesForEventsOtherThanLoginUser.order
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

        let tempEvents: TypeEvent[] = areNotMyPastEventsRemoved
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
      sortFilterVariablesForEventsOtherThanLoginUser.sortBy ===
        SORT_FILTER_VARIABLES_EVENTS.sortBy &&
      sortFilterVariablesForEventsOtherThanLoginUser.order ===
        SORT_FILTER_VARIABLES_EVENTS.order &&
      sortFilterVariablesForEventsOtherThanLoginUser.isTagDisabled ===
        SORT_FILTER_VARIABLES_EVENTS.isTagDisabled &&
      sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.length === 2
    ) {
      setIsSortFilterVariablesForEventsOtherThanLoginUserDefault(true);
    } else {
      setIsSortFilterVariablesForEventsOtherThanLoginUserDefault(false);
    }
  };
  const resetSortFilterVariablesForNotMyEvents = () => {
    setSortFilterVariablesForEventsOtherThanLoginUser(
      SORT_FILTER_VARIABLES_EVENTS
    );
    setIsSortFilterVariablesForEventsOtherThanLoginUserDefault(true);
    getEventsNotMine();
  };
  const handleSortFilterVariablesNotMyEventsDisplayOnly = (
    removeType: TypeTypeSortFilterVariablesEventsRemove
  ) => {
    if (
      sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.includes(
        removeType
      )
    ) {
      const index =
        sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.indexOf(
          removeType
        );
      const newRemoveArray = [
        ...sortFilterVariablesForEventsOtherThanLoginUser.displayOnly,
      ];
      newRemoveArray.splice(index, 1);
      setSortFilterVariablesForEventsOtherThanLoginUser((prev) => ({
        ...prev,
        displayOnly: newRemoveArray,
      }));
    } else {
      setSortFilterVariablesForEventsOtherThanLoginUser((prev) => ({
        ...prev,
        displayOnly: prev.displayOnly.concat(removeType),
      }));
    }
  };

  return (
    <EventContext.Provider
      value={{
        handleUpdate,
        handleDelete,
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

        fetchProfileUserEvents,
        profileUserEvents,
        cheerEvent,
        removeCheerFromEvent,

        // my events sort filter varialbes
        handleSortFilterVariablesMyEventsElement,
        handleSortFilterVariablesMyEventsOrder,
        sortFilterVariablesForMyEvents,
        resetSortFilterVariablesForMyEvents,
        isSortFilterVariablesForMyEventsDefault,
        checkSortFilterVariablesForMyEventsDefault,
        getLoginUserEventsDefault,
        handleSortFilterVariablesMyEventsTagDisabled,
        handleSortFilterVariablesMyEventsSearchTagName,
        handleSortFilterVariablesMyEventsDisplayOnly,

        // not my events sort filter varialbes
        handleSortFilterVariablesNotMyEventsElement,
        handleSortFilterVariablesNotMyEventsOrder,
        sortFilterVariablesForEventsOtherThanLoginUser,
        isSortFilterVariablesForEventsOtherThanLoginUserDefault,
        getEventsOtherThanLoginUserWithSort,
        checkSortFilterVariablesForNotMyEventsDefault,
        resetSortFilterVariablesForNotMyEvents,
        handleSortFilterVariablesNotMyEventsDisplayOnly,

        areMyPastEventsRemoved,
        setAreMyPastEventsRemoved,
        areNotMyPastEventsRemoved,
        setAreNotMyPastEventsRemoved,

        getEventsWithSortAndFilter,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
