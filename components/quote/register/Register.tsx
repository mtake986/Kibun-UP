"use client";

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [person, setPerson] = useState<string>();
  const [quote, setQuote] = useState<string>();
  const { toast } = useToast();

  const [user] = useAuthState(auth);

  const handleSubmit = async () => {
    // Add a new document with a generated id.
    if (quote && person) {
      const collectionRef = collection(db, "quotes");
      const docRef = await addDoc(collectionRef, {
        person,
        quote,
        uid: user ? user.uid : "undefined",
        createdAt: serverTimestamp(),
      }).then((docRef) => {
        // alert("Document written with ID: " + docRef.id);
        toast({
          className: "border-none bg-green-500 text-white",
          title: "Successfully Created",
          description: `
            Quote: ${quote}, 
            Person: ${person}
          `,
        });
        setPerson("");
        setQuote("");
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error occurred (probably missing fields)",
        description: "Make sure you have filled all the fields ",
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-end justify-between gap-3 sm:flex-row">
      <div className="w-full">
        <Label htmlFor="person">Person</Label>
        <Input
          onChange={(e) => {
            setPerson(e.target.value);
          }}
          value={person}
          id="person"
          placeholder="NIKE"
        />
      </div>
      <div className="w-full">
        <Label htmlFor="quote">Quote</Label>
        <Input
          onChange={(e) => {
            setQuote(e.target.value);
          }}
          value={quote}
          id="quote"
          placeholder="JUST DO IT"
        />
      </div>
      <Button
        className={`w-full border-none duration-300  hover:bg-violet-50 hover:text-violet-500 sm:w-auto`}
        onClick={() => handleSubmit()}
        variant="ghost"
      >
        Regsiter
      </Button>
    </div>
  );
};

export default Register;
