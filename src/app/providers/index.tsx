"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
}
