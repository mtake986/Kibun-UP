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


'use client';

import React from 'react'

const EditMode = () => {
  return (
    <div>EditMode</div>
  )
}

export default EditMode