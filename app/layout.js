import { Open_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const opensans = Open_Sans({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "CodeClock",
  description: "Track your daily coding progress with ease and simplicity!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={'text-base sm:text-lg textGradient ' + orbitron.className}>CodeClock</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <Link href={'https://www.linkedin.com/in/izzat-karimov/'} target="_blank" className="">
        <p className={'text-indigo-500 duration-200 hover:text-white hover:bg-indigo-500  ' + orbitron.className}>Made with 💚 by Izzat Karimov</p>
      </Link>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800  ' + opensans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}