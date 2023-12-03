"use client";
type IndexPageProps = {};
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

import UserActivity from "@/components/profile/activity/UserActivity";
import React from "react";
import PageTransition from "@/app/transition";

const UserActivityPage = (props: IndexPageProps, ref: IndexPageRef) => {
  return (
    <PageTransition ref={ref}>
      <UserActivity />
    </PageTransition>
  );
};

export default UserActivityPage;
