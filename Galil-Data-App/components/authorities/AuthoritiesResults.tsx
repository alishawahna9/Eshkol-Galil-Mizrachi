// components/authorities/AuthoritiesResults.tsx

import AuthoritiesTable, {
  AuthorityRow,
} from "@/components/authorities/AuthoritiesTable";

type Props = {
  // בעתיד אפשר להוסיף כאן searchParams / filters
};

export default function AuthoritiesResults({}: Props) {
  // ===== MOCK DATA (בהמשך: fetch לפי פילטרים) =====
  const tableData: AuthorityRow[] = [
    { name: "צפת", value: 39179 },
    { name: "קרית שמונה", value: 24254 },
    { name: "גולן", value: 21484 },
    { name: "הגליל העליון", value: 20881 },
    { name: "מרום הגליל", value: 16846 },
  ];

  return (
    <div className="mt-6 max-w-275">
      <AuthoritiesTable
        title="פירוט רשויות"
        data={tableData}
      />
    </div>
  );
}
