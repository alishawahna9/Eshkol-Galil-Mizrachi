import { FilterDropdown } from "./FilterDropdown";

type Props = {
  region: string;
  onRegionChange: (v: string) => void;

  compare: string;
  onCompareChange: (v: string) => void;

  valueType: string;
  onValueTypeChange: (v: string) => void;

  year: string;
  onYearChange: (v: string) => void;
};

export function FilterBar({
  region,
  onRegionChange,
  compare,
  onCompareChange,
  valueType,
  onValueTypeChange,
  year,
  onYearChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3" dir="rtl">
      <FilterDropdown
        placeholder="אזור"
        value={region}
        onChange={onRegionChange}
        options={[
          { value: "national", label: "ארצי" },
          { value: "district", label: "מחוז" },
          { value: "city", label: "עיר" },
        ]}
      />

      <FilterDropdown
        placeholder="נקודת השוואה"
        value={compare}
        onChange={onCompareChange}
        width="w-[160px]"
        options={[
          { value: "none", label: "ללא השוואה" },
          { value: "with", label: "עם השוואה" },
        ]}
      />

      <FilterDropdown
        placeholder="סוג ערך"
        value={valueType}
        onChange={onValueTypeChange}
        options={[
          { value: "number", label: "מספר" },
          { value: "percent", label: "אחוז" },
          { value: "index", label: "מדד" },
        ]}
      />

      <FilterDropdown
        placeholder="שנה"
        value={year}
        onChange={onYearChange}
        width="w-[90px]"
        options={[
          { value: "2024", label: "2024" },
          { value: "2023", label: "2023" },
          { value: "2022", label: "2022" },
        ]}
      />
    </div>
  );
}

