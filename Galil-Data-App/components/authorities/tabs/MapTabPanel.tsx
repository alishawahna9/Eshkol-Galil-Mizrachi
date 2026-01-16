"use client";

import { ReactNode } from "react";
import MapTab from "@/components/authorities/MapTab";

type Props = {
  tableComponent: ReactNode;
  onSelectAuthority?: (name: string | null) => void;
  selectedAuthority?: string | null;
  filters?: { search?: string; metric?: string; year?: string; valueType?: string; ageGroup?: string; gender?: string };
};

export default function MapTabPanel({
  tableComponent,
  onSelectAuthority,
  selectedAuthority,
  filters,
}: Props) {
  return (
    <div>
      <div className="h-123 w-full">
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
