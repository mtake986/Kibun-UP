"use client";
import ContactForm from "@/components/contact/ContactForm";
import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";

const ContactPage = () => {
  const { fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);
  return (
    <div className="sm:mb-32 p-5 sm:p-0">
      <ContactForm />
    </div>
  );
};

export default ContactPage;
