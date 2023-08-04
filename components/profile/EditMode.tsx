// "use client";

// import Link from "next/link";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
//   profilePic: z.string(),
// });

// const defaultValues = {
//   username: "",
//   profilePic: '',
// };

// // function Form({ onSubmit, children, ...props }) {
// //   return (
// //     <FormProvider {...props}>
// //       <form onSubmit={onSubmit}>{children}</form>
// //     </FormProvider>
// //   );
// // }

// export default function EditMode() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues,
//   });

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//     register,
//     setValue,
//   } = form;

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="profilePic"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>profilePic</FormLabel>
//               <FormControl>
//                 <Input {...field} type="file" id="profilePic" />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth, auth, uploadImage } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import defaultIcon from "@/public/defaultUserImage.png";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMode = ({ setIsEditMode }: Props) => {
  const [user] = useAuthState(auth);

  const currentUser = useAuth();

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
    if (!currentUser) return;
    if (photo) {
      setPhotoURL(URL.createObjectURL(photo));
    }
  }, [photo]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!currentUser) return;
    if (!photo && !newUsername) {
      alert("At least one field is required.");
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      uploadImage(photo, newUsername, currentUser, setLoading, setIsEditMode);
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
