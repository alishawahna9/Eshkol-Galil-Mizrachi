import TopNav from "@/components/topnav";
import ChatBot from "@/components/chatbot";
import SideFilterPanel from "./components/SideFilterPanel";
import FilterDropdown from "@/components/FilterDropdownBuilder";
import FilterBarBox from "@/components/FilterBarBox";

export default async function AuthoritiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  return (
    <>
      <TopNav />

      {/* MAIN LAYOUT */}
      <div
        dir="rtl"
        className="grid grid-cols-[1fr_3fr] gap-0 items-start px-2"
      >
        {/* SIDE FILTER PANEL */}
        <aside>
          <SideFilterPanel />
        </aside>

        {/* MAIN CONTENT */}
        <main className="pt-6">
          {/* FILTER BAR */}
          <FilterBarBox>
            {/* אזור */}
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

            {/* נקודת השוואה */}
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

            {/* סוג השוואה */}
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

            {/* סוג ערך */}
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

            {/* בחירת שנה */}
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
        </main>
      </div>

      <ChatBot />
    </>
  );
}
