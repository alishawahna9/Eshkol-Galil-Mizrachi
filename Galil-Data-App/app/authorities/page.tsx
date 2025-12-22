import TopNav from "@/components/topnav";
import ChatBot from "@/components/chatbot";
import SideFilterPanel from "./components/SideFilterPanel";
import StatsFilterBar from "./components/StatsFilterBar";

export default function AuthoritiesPage() {
  return (
    <>
      <TopNav />

      {/* אזור התוכן */}
      <main className=" grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 px-8 py-6" dir="rtl">
        
        
        <aside className="flex justify-start">
          <SideFilterPanel />
        </aside>

        
        <section className="flex flex-col">
    


          <StatsFilterBar />
        </section>

      </main>

      <ChatBot />
    </>
  );
}

