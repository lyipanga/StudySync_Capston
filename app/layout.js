import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/store/Providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Capstone: Simplify Your Learning Journey",
  description:
    "Capstone is an all-in-one platform designed to help students organize their study materials effortlessly. Upload textbooks, take notes, and create flashcards in a user-friendly interface that streamlines your learning experience. With secure user authentication, interactive note-taking, and powerful flashcard creation tools, StudyHub empowers students to stay organized and focused on what truly matters: mastering their studies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Providers>
          <>
            <Navbar />
            <main className="bg-white">{children}</main>
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
