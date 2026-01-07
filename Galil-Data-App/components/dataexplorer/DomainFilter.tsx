"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

type DomainKey =
  | "housing"
  | "health"
  | "demography"
  | "education"
  | "economy"
  | "welfare"
  | "localAuthorities"
  | "infrastructure";

const domains: {id: DomainKey; label: string}[] = [
  {id: "housing", label: "בנייה ודיור"},
  {id: "health", label: "בריאות"},
  {id: "demography", label: "דמוגרפיה"},
  {id: "education", label: "השכלה וחינוך"},
  {id: "economy", label: "כלכלה ותעסוקה"},
  {id: "welfare", label: "רווחה"},
  {id: "localAuthorities", label: "רשויות מקומיות"},
  {id: "infrastructure", label: "תשתיות"},
];

export default function DomainFilter({ active, onChange }: { active?: DomainKey; onChange?: (id: DomainKey) => void }) {
  const [activeDomain, setActiveDomain] = useState<DomainKey>(active ?? "localAuthorities");

  // sync when parent controls the active domain
  useEffect(() => {
    if (active !== undefined) setActiveDomain(active);
  }, [active]);

  return (
    <div className="space-y-4 text-right">
      <h3 className="text-lg font-semibold">סינון תחום</h3>

      {}
      <div className="grid grid-cols-3 gap-3 max-w-md">
        {domains.map((domain) => (
          <Button
            key={domain.id}
            type="button"
            variant={activeDomain === domain.id ? "default" : "outline"}
            onClick={() => {
              console.log('DomainFilter: clicked', domain.id);
              setActiveDomain(domain.id);
              onChange?.(domain.id);
            }}>
            {domain.label}
          </Button>
        ))}
      </div>

      {}
      <Button
        variant="outline"
        size="sm"
        className="mt-2 flex items-center gap-1"
        type="button"
        onClick={() => {}}>
        <Plus size={16} />
        מסננים נוספים
      </Button>
      <div className="mt-4 text-sm text-muted-foreground">
        {activeDomain === "demography" && "כאן בעתיד יוצג תוכן לדמוגרפיה"}
        {activeDomain === "health" && "כאן יוצג תוכן לבריאות"}
        {activeDomain === "housing" && "כאן יוצג תוכן לבנייה ודיור"}
        {activeDomain === "education" && "כאן יוצג תוכן להשכלה וחינוך"}
        {activeDomain === "economy" && "כאן יוצג תוכן לכלכלה ותעסוקה"}
        {activeDomain === "welfare" && "כאן יוצג תוכן לרווחה"}
        {activeDomain === "localAuthorities" && "כאן יוצג תוכן לרשויות מקומיות"}
        {activeDomain === "infrastructure" && "כאן יוצג תוכן לתשתיות"}
      </div>
    </div>
  );
}