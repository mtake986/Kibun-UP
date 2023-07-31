// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const db = getFirestore(app);

function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

const storage = getStorage(app);

const uploadImage = async (
  file,
  newUsername,
  currentUser,
  setLoading,
  setIsEditMode
) => {
  setLoading(true);

  let payload = {};
  if (file) {
    const fileRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    payload.photoURL = photoURL;
  }
  if (newUsername) {
    payload['displayName'] = newUsername;
  }
  console.log(payload)

  updateProfile(currentUser, payload)
    .then(() => {
      // Profile updated!
      // ...
      alert("Successfully Updated");
      setLoading(false);
      setIsEditMode(false);
    })
    .catch((error) => {
      alert("Something went wrong! Please try later.");
    });

  // const fileRef = ref(storage, `${currentUser.uid}.png`);
};
export { app, auth, provider, db, uploadImage, useAuth };
