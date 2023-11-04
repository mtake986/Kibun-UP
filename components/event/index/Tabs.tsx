import React, { useEffect, useState } from "react";
import { useEvent } from "@/context/EventContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import List from "../mine/List";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeLoginUser } from "@/types/type";
import LoadingIndicator from "@/components/home/LoadingIndicator";

type Props = {
  loginUser: TypeLoginUser;
};
const Tabs = ({ loginUser }: Props) => {
  const [user] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { lockedEvent, getLockedEvent, loginUserEvents, getLoginUserEvents, getEventsNotMine } = useEvent();

  return <List events={loginUserEvents} />;
};

export default Tabs;
