"use client"; // Required to use usePathname

import {Geist, Geist_Mono} from "next/font/google";
import {usePathname} from "next/navigation";
import {Providers} from "@/components/providers";
import Navbar from "@/components/navbar";
import Chatbot from "@/components/chatbot";
import {Footer} from "@/components/public-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();

  // Define exactly which route is your "Welcome" page.
  // If it's the home page, it's usually "/"
  const isWelcomePage = pathname === "/";
  const isAdminPage = pathname?.startsWith("/admin") ?? false;

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning style={{colorScheme: "light"}}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Only show Navbar if NOT on welcome page */}
            {!isWelcomePage && <Navbar />}

            <main className={`flex-1 ${!isWelcomePage ? "pt-16" : ""}`}>{children}</main>

            {/* Only show Footer if NOT on welcome page */}
            {!isWelcomePage && <Footer />}
          </div>

          {/* Only show Chatbot if NOT on welcome page */}
          {!isWelcomePage && <Chatbot />}
        </Providers>
      </body>
    </html>
  );
}
