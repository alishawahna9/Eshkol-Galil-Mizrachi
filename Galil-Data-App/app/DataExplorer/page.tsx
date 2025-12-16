import ChatBot from "@/components/chatbot";
import TopNav from "@/components/topnav";
import DomainFilter from "@/app/dataexplorer/components/DomainFilter";
import TopFilterBar from "./components/TopFilterBar";

export default function DataExplorerPage() {
  return (
    <>
      <TopNav />
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-[360px_1fr] gap-6 items-start">
          {/* Sidebar (מימין בגלל RTL) */}
          <aside>
            <DomainFilter />
          </aside>

          {/* Content */}
          <section>
            <TopFilterBar />
          </section>
        </div>
      </div>
      <ChatBot />
    </>
  );
}
