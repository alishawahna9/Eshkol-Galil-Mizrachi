"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SideFilterPanel } from "@/components/authorities/SideFilterPanel";
import AuthoritiesFiltersBar from "@/components/authorities/AuthoritiesFiltersBar";
import AuthorityTabs from "../../components/authorities/AuthorityTabs";
import AuthoritiesResults from "@/components/authorities/AuthoritiesResults"; // הייבוא החדש

export default function AuthoritiesPage() {
  // מחקנו את ה-tableData הישן כי הטבלה החדשה שולפת מידע בעצמה
  const [filters, setFilters] = useState<{ search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string }>({ metric: "total_population", year: "2023" });
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);

  const sp = useSearchParams();
  const year = sp.get("year") ?? undefined;
  const valueType = sp.get("valueType") ?? undefined;

  return (
    <div className="mt-6">
      <div dir="rtl" className="grid grid-cols-[420px_1fr] gap-4 px-4">
        <aside>
          <SideFilterPanel onFiltersChange={setFilters} />
        </aside>

        <main>
          <div className="w-full pt-6 ">

            <div className="mt-6 max-w-275">

              {/* לשונית/גרפים */}
              <div className="mt-6">
                <AuthorityTabs tableComponent={<AuthoritiesResults filters={filters} selectedAuthority={selectedAuthority} />} onSelectAuthority={setSelectedAuthority} selectedAuthority={selectedAuthority} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}