"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SideFilterPanel } from "@/components/authorities/SideFilterPanel";
import AuthoritiesFiltersBar from "@/components/authorities/AuthoritiesFiltersBar";
import AuthorityTabs from "../../components/authorities/AuthorityTabs";
import AuthoritiesResults from "@/components/authorities/AuthoritiesResults"; // הייבוא החדש

export default function AuthoritiesPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  // מחקנו את ה-tableData הישן כי הטבלה החדשה שולפת מידע בעצמה
  const [filters, setFilters] = useState<{ domain?: string; search?: string; metric?: string; year?: string; valueType?: string }>({ domain: "localAuthorities", metric: "total_population" });
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);

  const sp = useSearchParams();
  const year = sp.get("year") ?? undefined;
  const valueType = sp.get("valueType") ?? sp.get("valueType") ?? sp.get("valueType") ?? sp.get("valueType") ?? sp.get("valueType") ?? sp.get("valueType") ?? sp.get("valueType") ?? sp.get("valueType") ?? undefined; // ensure defined

  const mergedFilters = { ...filters, year, valueType };

  return (
    <div className="mt-6">
      <div dir="rtl" className="grid grid-cols-[420px_1fr] gap-4 px-4">
        <aside>
          <SideFilterPanel onFiltersChange={setFilters} />
        </aside>

        <main>
          <div className="w-full pt-6 ">
            <AuthoritiesFiltersBar />

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