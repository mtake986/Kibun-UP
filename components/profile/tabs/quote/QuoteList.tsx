"use client";
import React from "react";
import { app, auth } from "@/app/config/Firebase";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirestore, collection, where, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import QuoteCard from "@/components/profile/tabs/quote/QuoteCard";

const QuoteList = () => {
  const [user] = useAuthState(auth);

  const params = useParams();

  const [value, loading, error] = useCollection(
    query(
      collection(getFirestore(app), "quotes"),
      where("uid", "==", params?.uid)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      {" "}
      {error ? <strong>Error: {JSON.stringify(error)}</strong> : null}
      {loading ? <span>Collection: Loading...</span> : null}
      {value && (
        <div>
          <div>Collection:{value.size}</div>
          {value.docs.map((doc) => (
            <QuoteCard key={doc.id} quote={{ id: doc.id, ...doc.data() }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuoteList;
