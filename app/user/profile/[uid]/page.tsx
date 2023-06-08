"use client";
import { auth } from "@/app/config/Firebase";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePage() {
  const [user] = useAuthState(auth);

  const params = useParams();

  return (
    <div>
      <Image
        width={200}
        height={200}
        src={user?.photoURL ? user?.photoURL : "https://placehold.co/50x50"}
        alt="profile pic"
        className="m-5 mx-auto cursor-pointer rounded-full duration-300 hover:opacity-70"
      />
      <p>{user?.displayName}</p>
      <span>Post: {params.uid}</span>
    </div>
  );
}
