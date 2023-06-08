"use client";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();

  return <p>Post: {params.uid}</p>;
}
