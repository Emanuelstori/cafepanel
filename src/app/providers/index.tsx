"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";


interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
