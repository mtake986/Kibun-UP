"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "../ui/textarea";

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
  const [newDescription, setNewDescription] = useState<string>(
    loginUser?.description || ""
  );

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
      alert("Username and items per page are required.");
      e.preventDefault();
    } else {
      e.preventDefault();
      uploadImage(
        photo,
        newUsername,
        newItemsPerPage,
        newDescription,
        user,
        setLoading,
        setIsEditMode
      );
    }
  };

  if (loading) return <p>Updating...</p>;

  return (
    <form
      className="mx-auto flex w-full max-w-[350px] flex-col gap-5 sm:max-w-none"
      onSubmit={onSubmit}
    >
      <div className="grid w-full max-w-sm sm:max-w-none items-center gap-1.5">
        <Label htmlFor="picture">Profile Picture</Label>
        <Input
          onChange={(e) => {
            handleProfilePicChange(e);
          }}
          id="picture"
          type="file"
        />
      </div>
      <div className="sm:flex-row flex flex-col gap-5">
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
          <Label htmlFor="itemsPerPage">
            Items / page <span className="text-red-500">*</span>
          </Label>
          <Input
            onChange={(e) => {
              setNewItemsPerPage(Number(e.target.value));
            }}
            min={1}
            max={99}
            id="itemsPerPage"
            type="number"
            defaultValue={String(loginUser?.settings.itemsPerPage)}
          />
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center sm:w-full sm:max-w-none gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
          id="description"
          defaultValue={loginUser?.description}
          placeholder="Ex.) I am from Japan and try to transfer to Harvard University."
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
