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
    { label: "2002", value: "2002" },
    { label: "2003", value: "2003" },
    { label: "2004", value: "2004" },
    { label: "2005", value: "2005" },
    { label: "2006", value: "2006" },
    { label: "2007", value: "2007" },
    { label: "2008", value: "2008" },
    { label: "2009", value: "2009" },
    { label: "2010", value: "2010" },
    { label: "2011", value: "2011" },
    { label: "2012", value: "2012" },
    { label: "2013", value: "2013" },
    { label: "2014", value: "2014" },
    { label: "2015", value: "2015" },
    { label: "2016", value: "2016" },
    { label: "2017", value: "2017" },
    { label: "2018", value: "2018" },
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ]}
/>

    </FilterBarBox>
  );
}
