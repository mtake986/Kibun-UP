"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";

type Props = {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMode = ({ setIsEditMode }: Props) => {
  const [user] = useAuthState(auth);

  const { loginUser, uploadImage } = useAuth();

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>();
  const [newUsername, setNewUsername] = useState<string>(
    loginUser?.displayName || ""
  );
  const [newItemsPerPage, setNewItemsPerPage] = useState<number | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (photo) {
      setPhotoURL(URL.createObjectURL(photo));
    }
  }, [photo]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return;
    if (!newUsername && !newItemsPerPage) {
      alert("Username and items per page is required.");
      e.preventDefault();
    } else {
      e.preventDefault();
      uploadImage(
        photo,
        newUsername,
        newItemsPerPage,
        user,
        setLoading,
        setIsEditMode
      );
    }
  };

  if (loading) return <p>Updating...</p>;

  return (
    <form
      className="mx-auto flex max-w-[250px] flex-col gap-5"
      onSubmit={onSubmit}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Profile Picture</Label>
        <Input
          onChange={(e) => {
            handleProfilePicChange(e);
          }}
          id="picture"
          type="file"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">
          Username <span className="text-red-500">*</span>
        </Label>
        <Input
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
          id="username"
          defaultValue={loginUser?.displayName}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">
          Items / page <span className="text-red-500">*</span>
        </Label>
        <Input
          onChange={(e) => {
            setNewItemsPerPage(Number(e.target.value));
          }}
          id="itemsPerPage"
          type="number"
          defaultValue={String(loginUser?.settings.itemsPerPage)}
        />
      </div>

      <div className="flex items-center gap-5 ">
        <button
          className="w-full cursor-pointer rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600"
          type="submit"
        >
          Submit
        </button>
        <button
          className="cursor-pointer rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white  dark:hover:bg-red-600"
          onClick={() => setIsEditMode(false)}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default EditMode;
