"use client";

import FilterBarBox from "@/components/FilterBarBox";
import { FilterDropdownMenu } from "@/components/FilterDropdownBuilder";

export default function AuthoritiesTopFilterBar() {
  return (
    <section dir="rtl" className="w-full">
      <div className="mx-auto max-w-7xl px-6 pt-4">
        <FilterBarBox>
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
            label="קבוצת גיל"
            param="ageGroup"
            options={[
              { label: "0-4", value: "0_4" },
              { label: "5-9", value: "5_9" },
              { label: "10-14", value: "10_14" },
              { label: "15-19", value: "15_19" },
              { label: "20-29", value: "20_29" },
              { label: "30-44", value: "30_44" },
              { label: "45-59", value: "45_59" },
              { label: "60-64", value: "60_64" },
              { label: "65+", value: "65_plus" },
            ]}
          />

          <FilterDropdownMenu
            label="מין"
            param="gender"
            options={[
              { label: "גברים", value: "men" },
              { label: "נשים", value: "women" },
            ]}
          />
        </FilterBarBox>
      </div>
    </section>
  );
}
