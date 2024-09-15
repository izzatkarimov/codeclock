import { Open_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Head from "./head";
import Logout from "@/components/Logout";
import ThemeToggle from "@/components/ThemeToggle";

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
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Logout />
      </div>
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <Link href={'https://www.linkedin.com/in/izzat-karimov/'} target="_blank" className="">
        <p className={'text-gray-800 dark:text-gray-200 duration-200 hover:text-white hover:bg-gray-600 dark:hover:bg-gray-400 ' + orbitron.className}>Made with 💚 by Izzat Karimov</p>
      </Link>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <ThemeProvider>
          <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 transition-colors duration-200 ' + opensans.className}>
            {header}
            {children}
            {footer}
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}