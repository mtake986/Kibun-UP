"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStar, SunDim } from "lucide-react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MoonStar size={24} /> : <SunDim size={24} />}
    </button>
  );
};
