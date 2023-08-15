'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const Footer = () => {
  const [today, setToday] = useState<number>(new Date().getFullYear());
  return (
    <footer className="w-full py-1 m-auto text-center text-sm text-slate-400 absolute bottom-0">
      &copy; Copyright <span>{today}</span>{" "}
      <Link
        target="_blank"
        href="https://github.com/mtake986"
        className="text-sky-500 hover:underline"
      >
        Masahiro Takechi
      </Link>
    </footer>
  );
}

export default Footer