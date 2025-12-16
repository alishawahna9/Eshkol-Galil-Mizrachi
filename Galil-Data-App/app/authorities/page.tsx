import TopNav from "@/components/topnav";
import ChatBot from "@/components/chatbot";
import SideFilterPanel from "./components/SideFilterPanel";
import FilterBarClient from "./components/FilterBarClient";

export default function AuthoritiesPage() {
  return (
    <>
      <TopNav />

      {/* אזור התוכן */}
      <main className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 px-8 py-6" dir="rtl">
        
        {/* ימין – כרטיס / סיכום */}
        <aside className="flex justify-start">
          <SideFilterPanel />
        </aside>

        {/* שמאל – תוכן עיקרי */}
        <section className="flex flex-col items-start">
          <h1 className="text-3xl font-bold mb-2">תחקור רשויות</h1>
          <p className="text-lg mb-6">ברוכים הבאים לעמוד תחקור רשויות.</p>

          {/* הפילטרים מתחת להידר, בצד שמאל */}
          <FilterBarClient />
        </section>

      </main>

      <ChatBot />
    </>
  );
}

