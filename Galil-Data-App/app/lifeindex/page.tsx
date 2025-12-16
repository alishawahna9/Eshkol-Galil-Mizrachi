import ChatBot from "@/components/chatbot";
import TopNav from "@/components/topnav";

export default function LifeIndexPage() {
  return (
    <>
      <TopNav />
      <div className="flex flex-col items-center justify-center min-h-screen text-foreground bg-background">
        <h1 className="text-3xl font-bold mb-4">מדד איכות חיים</h1>
        <p className="text-lg">ברוכים הבאים לעמוד מדד איכות חיים .</p>
      </div>
      <ChatBot />
    </>
  );
}
