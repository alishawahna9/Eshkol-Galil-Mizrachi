import TopNav from "@/components/topnav";
import ChatBot from "@/components/chatbot";
import SideFilterPanel from "./components/SideFilterPanel";

export default function AuthoritiesPage() {
  return (
    <>
      <TopNav />
      <div className="flex flex-col items-center justify-center min-h-screen text-foreground bg-background">
        <SideFilterPanel />
        <h1 className="text-3xl font-bold mb-4">תחקור רשויות</h1>
        <p className="text-lg">ברוכים הבאים לעמוד תחקור רשויות .</p>
      </div>

      <ChatBot />
    </>
  );
}
