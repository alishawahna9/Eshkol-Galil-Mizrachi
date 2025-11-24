import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import ChatbotAssistant from "./components/chatbot/ChatbotAssistant";
import Footer from "./components/Footer";

export const styles = {
  layout: "min-h-screen bg-gray-50 dark:bg-[#0F1F38] transition-colors duration-300",
  main: "w-full"
};

export const cssVariables = `
  :root {
    --navy: #0F1F38;
    --turquoise-light: #6FD1F5;
    --turquoise: #22A7D6;
    --blue-deep: #1B4C8C;
    --lime: #8CD43A;
    --magenta: #B33C9D;
    --beige: #D1B48C;
  }
`;

export default function Layout({ children, currentPageName }) {
  const [darkMode, setDarkMode] = useState(false);
  const isHomePage = currentPageName === "Home";
  const is404Page = currentPageName === "NotFound";

  // Toggle dark mode on root HTML
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Home Page — Only render children (no nav, no footer)
  if (isHomePage || is404Page) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout} dir="rtl">
      <style>{cssVariables}</style>

      {/* NAV */}
      <TopNav darkMode={darkMode} setDarkMode={setDarkMode} currentPageName={currentPageName} />

      {/* CONTENT */}
      <main className={styles.main}>{children}</main>

      {/* FOOTER */}
      <Footer />

      {/* CHATBOT */}
      <ChatbotAssistant />
    </div>
  );
}
