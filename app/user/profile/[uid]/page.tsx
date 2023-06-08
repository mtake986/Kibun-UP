"use client";
import { app, auth } from "@/app/config/Firebase";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirestore, collection, where, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import QuoteCard from "@/components/profile/QuoteCard";

export default function ProfilePage() {
  const [user] = useAuthState(auth);

  const params = useParams();

  const [value, loading, error] = useCollection(
    query(collection(getFirestore(app), "quotes"), (where('uid', '==', params?.uid))),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(value?.docs.map((doc) => doc.data()))
  return (
    // <div>
    //   <Image
    //     width={200}
    //     height={200}
    //     src={user?.photoURL ? user?.photoURL : "https://placehold.co/50x50"}
    //     alt="profile pic"
    //     className="m-5 mx-auto  rounded-full"
    //   />
    //   <p>{user?.displayName}</p>
    //   <span>Post: {params.uid}</span>
    // </div>
    <>
      <>
        {error ? <strong>Error: {JSON.stringify(error)}</strong> : null}
        {loading ? <span>Collection: Loading...</span> : null}
        {value && (
          <div>
            <div>Collection:{value.size}</div>
            {value.docs.map((doc) => (
              <QuoteCard key={doc.id} quote={{id: doc.id, ...doc.data()}} />
            ))}
          </div>
        )}
      </>
    </>
  );
}
