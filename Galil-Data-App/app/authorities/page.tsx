"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SideFilterPanel } from "@/components/authorities/SideFilterPanel";
import AuthoritiesFiltersBar from "@/components/authorities/AuthoritiesFiltersBar";
import AuthorityTabs from "../../components/authorities/AuthorityTabs";
import AuthoritiesResults from "@/components/authorities/AuthoritiesResults";

function AuthoritiesPageContent() {
  // מחקנו את ה-tableData הישן כי הטבלה החדשה שולפת מידע בעצמה
  const [filters, setFilters] = useState<{ search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string }>({ metric: "total_population", year: "2023" });
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("map");

  const sp = useSearchParams();
  const year = sp?.get("year") ?? undefined;
  const valueType = sp?.get("valueType") ?? undefined;

  return (
  <main dir="rtl" className="px-6 py-4">
    <div className="mt-6">
    {/* Page title */}
    <h1 className="text-3xl font-bold text-center mb-8 mt-5">
       תחקור רשויות  - אשקול גליל מזרחי
    </h1>
      <div dir="rtl" className="grid grid-cols-1 gap-4 lg:grid-cols-[420px_1fr] items-start px-4">
        <aside>
          <SideFilterPanel onFiltersChange={setFilters} activeTab={activeTab} />
        </aside>

        <main>
        
          <div className="w-full">

            <div className="max-w-275">

              {/* לשונית/גרפים */}
              <div>
                <AuthorityTabs tableComponent={<AuthoritiesResults filters={filters} selectedAuthority={selectedAuthority} />} onSelectAuthority={setSelectedAuthority} selectedAuthority={selectedAuthority} filters={filters} onActiveTabChange={setActiveTab} />
              </div>
            </div>
          </div>
          </main>
      </div>
    </div>
  </main>
  );
}

export default function AuthoritiesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">טוען...</div>}>
      <AuthoritiesPageContent />
    </Suspense>
  );
}