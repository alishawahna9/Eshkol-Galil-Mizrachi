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
              {/* כאן הקסם: אנחנו מעבירים את הקומפוננטה של השרת
                  לתוך הקומפוננטה של הלקוח כ-Prop
              */}
              <AuthorityTabs 
                  tableComponent={<AuthoritiesResults />} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}