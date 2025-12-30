import FilterBarBox from "@/components/FilterBarBox";
import { FilterDropdownMenu } from "@/components/FilterDropdownBuilder";

export default function AuthoritiesFiltersBar() {
  return (
    <FilterBarBox>
      <FilterDropdownMenu
        label="אזור"
        param="area"
        placeholder="ארצי"
        options={[
          { label: "ארצי", value: "national" },
          { label: "צפון", value: "north" },
          { label: "מרכז", value: "center" },
        ]}
      />

      <FilterDropdownMenu
        label="סוג השוואה"
        param="compareType"
        placeholder="ללא השוואה"
        options={[
          { label: "מול תקופה קודמת", value: "previous" },
          { label: "מול יעד", value: "target" },
        ]}
      />

      <FilterDropdownMenu
        label="נקודת השוואה"
        param="comparePoint"
        placeholder="ללא נקודת השוואה"
        options={[
          { label: "חודש קודם", value: "prev-month" },
          { label: "שנה קודמת", value: "prev-year" },
        ]}
      />

      <FilterDropdownMenu
        label="סוג ערך"
        param="valueType"
        placeholder="מספרי"
        options={[
          { label: "מספרי", value: "number" },
          { label: "אחוזי", value: "percent" },
        ]}
      />

      <FilterDropdownMenu
        label="בחירת שנה"
        param="year"
        options={[
          { label: "2022", value: "2022" },
          { label: "2023", value: "2023" },
          { label: "2024", value: "2024" },
        ]}
      />
    </FilterBarBox>
  );
}
