
import { useEvent } from "@/context/EventContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import List from "../mine/List";

const Tabs = () => {
  const [user] = useAuthState(auth);

  const { loginUserEvents } = useEvent();

  return <List events={loginUserEvents} />;
};

export default Tabs;
