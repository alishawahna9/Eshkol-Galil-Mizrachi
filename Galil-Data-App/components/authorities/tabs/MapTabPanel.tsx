"use client";

import { ReactNode, useState } from "react";
import MapTab from "@/components/authorities/MapTab";
import AuthoritiesTopFilterBar from "@/components/authorities/AuthoritiesTopFilterBar";

type Props = {
  tableComponent: ReactNode;
  onSelectAuthority?: (name: string | null) => void;
  selectedAuthority?: string | null;
};

export default function MapTabPanel({
  tableComponent,
  onSelectAuthority,
  selectedAuthority,
}: Props) {
  const [filters, setFilters] = useState<{ domain?: string; search?: string; metric?: string }>({ domain: "", search: "", metric: "" });

  return (
    <div>
      <AuthoritiesTopFilterBar />
      <div className="h-[520px] w-full mt-4">
        <MapTab
          tableComponent={tableComponent}
          onSelectAuthority={onSelectAuthority}
          selectedAuthority={selectedAuthority}
          filters={filters}
        />
      </div>
    </div>
  );
}
