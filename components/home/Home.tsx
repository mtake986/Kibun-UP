"use client";

import React, { useEffect, useState } from "react";
import Quote from "./QuoteFolder/Quote";
import Event from "./EventFolder/Event";

const Home = () => {

  return (
    <>
      <Event />
      <Quote />
    </>
  );
};

export default Home;
