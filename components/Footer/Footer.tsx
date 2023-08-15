'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const Footer = () => {
  const [today, setToday] = useState<number>(new Date().getFullYear());
  return (
    <footer className="py-1 text-center text-xs text-slate-400 absolute bottom-0">
      &copy; Copyright <span>{today}</span>{" "}
      <Link
        target="_blank"
        href="https://github.com/mtake986"
        className="text-sky-300 hover:underline"
      >
        Masahiro Takechi
      </Link>
    </footer>
  );
}

export default Footer