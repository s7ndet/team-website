// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Team Website",
  description: "5 беттік топтық жоба (Сүндет, Сейдалы және т.б.)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body className="bg-zinc-50 text-black dark:bg-zinc-900 dark:text-white">
        <header className="flex justify-center gap-6 py-6 bg-white dark:bg-black shadow-md">
          <Link href="/">
