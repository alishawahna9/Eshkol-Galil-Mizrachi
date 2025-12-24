import TopNav from "@/components/topnav";
import ChatBot from "@/components/chatbot";

import FilterDropdown from "@/components/FilterDropdownBuilder";
import FilterBarBox from "@/components/FilterBarBox";
import TrendChartCard from "@/components/ui/TrendChartCard";

import SideFilterPanel from "./components/SideFilterPanel";
import ComparisonChart from "./components/ComparisonChart";

import AuthoritiesMap from "@/app/authorities/components/AuthoritiesMap";
import AuthoritiesTable, {
  AuthorityRow,
} from "@/app/authorities/components/AuthoritiesTable";
import AuthorityTabs from "./components/AuthorityTabs";

export default async function AuthoritiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  // ===== TABLE DATA (mock – later from server) =====
  const tableData: AuthorityRow[] = [
    { name: "צפת", value: 39179 },
    { name: "קרית שמונה", value: 24254 },
    { name: "גולן", value: 21484 },
    { name: "הגליל העליון", value: 20881 },
    { name: "מרום הגליל", value: 16846 },
  ];

  return (
    <>
      <TopNav />

      {/* ===== GLOBAL OFFSET FROM HEADER ===== */}
      <div className="mt-6">
        <div dir="rtl" className="grid grid-cols-[420px_1fr] gap-4 px-4">
          {/* ===== SIDE FILTER PANEL ===== */}
          <aside>
            <SideFilterPanel />
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main>
            {/* ===== CONTENT WIDTH LIMIT ===== */}
            <div className="max-w-[1200px]">
              {/* ===== FILTER BAR ===== */}
              <FilterBarBox>
                <FilterDropdown
                  label="אזור"
                  param="area"
                  value={params.area ?? ""}
                  placeholder="ארצי"
                  options={[
                    { label: "ארצי", value: "national" },
                    { label: "צפון", value: "north" },
                    { label: "מרכז", value: "center" },
                  ]}
                />

                <FilterDropdown
                  label="סוג השוואה"
                  param="compareType"
                  value={params.compareType ?? ""}
                  placeholder="ללא השוואה"
                  options={[
                    { label: "מול תקופה קודמת", value: "previous" },
                    { label: "מול יעד", value: "target" },
                  ]}
                />

                <FilterDropdown
                  label="נקודת השוואה"
                  param="comparePoint"
                  value={params.comparePoint ?? ""}
                  placeholder="ללא נקודת השוואה"
                  disabled={!params.compareType}
                  options={[
                    { label: "חודש קודם", value: "prev-month" },
                    { label: "שנה קודמת", value: "prev-year" },
                  ]}
                />

                <FilterDropdown
                  label="סוג ערך"
                  param="valueType"
                  value={params.valueType ?? "number"}
                  placeholder="מספרי"
                  options={[
                    { label: "מספרי", value: "number" },
                    { label: "אחוזי", value: "percent" },
                  ]}
                />

                <FilterDropdown
                  label="בחירת שנה"
                  param="year"
                  value={params.year ?? "2024"}
                  options={[
                    { label: "2022", value: "2022" },
                    { label: "2023", value: "2023" },
                    { label: "2024", value: "2024" },
                  ]}
                />
              </FilterBarBox>

              {/* ===== TABS (map / chart / trend / ...) ===== */}
              <div className="mt-6 max-w-[1100px]">
                <AuthorityTabs tableData={tableData} />
              </div>

              {/* ===== TOP CHART (Comparison) ===== */}
              <div className="mt-6 max-w-[1100px]">
                <ComparisonChart />
              </div>

              {/* ===== MAP + TABLE WRAPPER ===== */}
              <div className="mt-6 max-w-[1100px]">
                <div className="grid grid-cols-[520px_1fr] gap-4 h-[520px]">
                  {/* ===== TABLE WRAPPER ===== */}
                  <div className="w-full h-full">
                    <AuthoritiesTable title="פירוט רשויות" data={tableData} />
                  </div>

                  {/* ===== MAP WRAPPER ===== */}
                  <div className="w-full h-full">
                    <AuthoritiesMap />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ChatBot />
    </>
  );
}
