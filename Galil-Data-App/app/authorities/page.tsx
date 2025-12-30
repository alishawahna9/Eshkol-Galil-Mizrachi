import {FilterDropdownMenu} from "@/components/FilterDropdownBuilder";
import FilterBarBox from "@/components/FilterBarBox";
import TrendChartCard from "@/components/ui/TrendChartCard";

import {SideFilterPanel} from "@/components/authorities/SideFilterPanel";
import ComparisonChart from "@/components/authorities/ComparisonChart";
import AuthoritiesFiltersBar from "@/components/authorities/AuthoritiesFiltersBar";
import AuthoritiesMap from "@/components/authorities/AuthoritiesMap";
import AuthoritiesTable, {AuthorityRow} from "@/components/authorities/AuthoritiesTable";
import AuthorityTabs from "../../components/authorities/AuthorityTabs";

export default function AuthoritiesPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const tableData: AuthorityRow[] = [
    {name: "צפת", value: 39179},
    {name: "קרית שמונה", value: 24254},
    {name: "גולן", value: 21484},
    {name: "הגליל העליון", value: 20881},
    {name: "מרום הגליל", value: 16846},
  ];

  return (
    <div className="mt-6">
      <div dir="rtl" className="grid grid-cols-[420px_1fr] gap-4 px-4">
        <aside>
          <SideFilterPanel />
        </aside>

        <main>
          <div className="pt-6 max-w-300">
            <AuthoritiesFiltersBar />

            <div className="mt-6 max-w-275">
              <AuthorityTabs tableData={tableData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
