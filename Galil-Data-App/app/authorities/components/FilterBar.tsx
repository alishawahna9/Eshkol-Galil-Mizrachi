import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type FilterConfig = {
  key: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  width?: string;
};

type Props = {
  filters: FilterConfig[];
};

export function FilterBar({ filters }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 w-full" dir="rtl">
      {filters.map(filter => {
        const label =
          filter.options.find(o => o.value === filter.value)?.label ??
          filter.placeholder;

        return (
          <DropdownMenu key={filter.key}>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex items-center justify-between gap-2 rounded-md border bg-background px-3 py-1.5 text-sm ${
                  filter.width ?? "w-[130px]"
                }`}
              >
                <span className="truncate">{label}</span>
                <ChevronDown className="size-4 opacity-60" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={filter.value}
                onValueChange={filter.onChange}
              >
                {filter.options.map(opt => (
                  <DropdownMenuRadioItem
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}

