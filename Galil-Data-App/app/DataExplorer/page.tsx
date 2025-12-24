//app/DataExplorer/page.tsx
import SideFilterPanel from "@/app/authorities/components/SideFilterPanel";
import ChatBot from "@/components/chatbot";
import TopNav from "@/components/topnav";
import DataExplorerView from "./components/DataExplorerView";

export default function DataExplorerPage() {
  // server-safe constants
  const personalSegmentionOprtions = [
    { label: "מגדר", value: "מגדר" },
    { label: "גיל", value: "גיל" },
    { label: "מצב משפחתי", value: "מצב משפחתי" },
    { label: "דת", value: "דת" },
  ];

  const contentTypeOptions = [
    { label: "מספרי", value: "number" },
    { label: "אחוזים", value: "percent" },
  ];

  const yearsOptions = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ];

  const tableHeaders = ["שנה", "אשכול גליל מזרחי"];
  const tableRows: (string | number)[][] = [
    [2017, "13%"],
    [2018, "25%"],
    [2019, "14%"],
    [2020, "14%"],
    [2021, "22%"],
    [2022, "21%"],
  ];

  return (
    <>
      <TopNav />

      <main dir="rtl" className="px-6 py-4">
        <div
          className="
            mx-auto
            grid
            grid-cols-1
            gap-6
            items-stretch
            md:grid-cols-[minmax(360px,400px)_1fr]
            md:gap-8
          "
        >
          <aside className="w-full order-1 md:order-0">
            <SideFilterPanel />
          </aside>

          {/* ✅ All hooks are inside this client component */}
          <section className="w-full min-w-0 flex flex-col order-2 md:order-0">
            <DataExplorerView
              personalSegmentionOprtions={personalSegmentionOprtions}
              contentTypeOptions={contentTypeOptions}
              yearsOptions={yearsOptions}
              tableHeaders={tableHeaders}
              tableRows={tableRows}
            />
          </section>
        </div>
      </main>

      <ChatBot />
    </>
  );
}
