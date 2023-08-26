"use client";

import React, { useEffect } from "react";
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

  const { uploadImage } = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [photoURL, setPhotoURL] = React.useState<string | null>();
  const [newUsername, setNewUsername] = React.useState<string>("");

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
    if (!photo && !newUsername) {
      alert("At least one field is required.");
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      uploadImage(photo, newUsername, user, setLoading, setIsEditMode);
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
        <Label htmlFor="username">Username</Label>
        <Input
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
          id="username"
        />
      </div>

      <div className="flex items-center gap-5 ">
        <Button
          className="w-full bg-blue-50 text-blue-500 hover:bg-blue-100"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="bg-slate-50 text-slate-500 hover:bg-slate-100"
          onClick={() => setIsEditMode(false)}
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default EditMode;
