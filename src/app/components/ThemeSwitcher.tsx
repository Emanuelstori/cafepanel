"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeSwitcher() {
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
      className={`fixed z-50 bottom-5 right-5 w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200 text-primary dark:text-white bg-slate-500 dark:bg-slate-700`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <FaSun className="fill-yellow-300" />
      ) : (
        <FaMoon className="fill-gray-400" />
      )}
    </button>
  );
}
