"use client";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { TextField } from "@mui/material";

const Register = () => {
  const [person, setPerson] = useState<string>();
  const [quote, setQuote] = useState<string>();

  return (
    <div className="">
      <TextField
        onChange={(e) => {
          setPerson(e.target.value);
        }}
        value={person}
        id="outlined-basic"
        label='person'
        variant="outlined"
      />
      <TextField
        onChange={(e) => {
          setQuote(e.target.value);
        }}
        value={quote}
        id="outlined-basic"
        label='quote'
        variant="outlined"
      />
      <p>
        person: {person}, quote: {quote}
      </p>
      <button>Regsiter Quote</button>
    </div>
  );
};

export default Register;
