// components/ui/FilterDropdownMenu.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  param: string; // שם הפרמטר ב-URL
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export function FilterDropdownMenu({
  label,
  param,
  options,
  placeholder = "בחר",
  disabled,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔑 מקור האמת – הערך מה-URL
  const currentValue = searchParams.get(param) ?? "";

  const currentLabel =
    options.find((o) => o.value === currentValue)?.label ?? placeholder;

  function onValueChange(v: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, v);

    // replace + בלי גלילה = UX יותר טוב
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div dir="rtl" className="flex flex-col gap-1 w-[210px]">
      {/* Label קטן */}
      <span className="text-xs font-medium text-sky-600 text-right">
        {label}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            size="sm"
            className="justify-between h-8 px-3 text-sm"
          >
            <span className="truncate">{currentLabel}</span>
            <span className="text-muted-foreground">▾</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className={`min-w-[170px] ${
            param === "year" ? "max-h-[240px] overflow-y-auto" : ""
          }`}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            {label}
          </DropdownMenuLabel>

          <DropdownMenuRadioGroup
            value={currentValue}
            onValueChange={onValueChange}
          >
            {options.map((op) => (
              <DropdownMenuRadioItem
                key={op.value}
                value={op.value}
                className="text-sm"
              >
                {op.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
