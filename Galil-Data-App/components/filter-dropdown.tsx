"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import type {FilterItem} from "@/types/filter";

type Props = {
  title?: string;
  filters: FilterItem[];
  orientation: "horizontal" | "vertical";
  onSelectAction?: (next: FilterItem[]) => void;
};

export function FilterDropdown({
  title, // ✅ FIX: destructure title
  filters,
  orientation,
  onSelectAction,
}: Props) {
  const [state, setState] = React.useState<FilterItem[]>(filters);

  const updateFilter = (index: number, nextActive: string[]) => {
    const next = state.map((f, i) => (i === index ? {...f, active: nextActive} : f));

    setState(next);
    onSelectAction?.(next);
  };

  const handleSelect = (index: number, value: string) => {
    const {options, active, selectAll} = state[index];

    if (selectAll && value === "__all__") {
      updateFilter(index, active.length === options.length ? [] : [...options]);
      return;
    }

    updateFilter(
      index,
      active.includes(value) ? active.filter((v) => v !== value) : [...active, value]
    );
  };

  // ✅ Clear all filters
  const clearAll = () => {
    const cleared = state.map((f) => ({
      ...f,
      active: [],
    }));

    setState(cleared);
    onSelectAction?.(cleared);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* TITLE + CLEAR */}
      {title && (
        <div className="flex items-center gap-3 my-3">
          <span className="text-sm font-semibold text-muted-foreground">{title}</span>

          <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs mr-10">
            נקה סינון
          </Button>
        </div>
      )}

      {/* FILTERS */}
      <div
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start"
        )}>
        {state.map((filter, index) => {
          const {label, options, active, placeholder, selectAll} = filter;

          const display =
            active.length === 0
              ? placeholder ?? "Select"
              : selectAll && active.length === options.length
              ? "All"
              : active.join(", ");

          return (
            <React.Fragment key={label}>
              {/* ONE FILTER BLOCK */}
              <div
                className={cn(
                  "gap-2",
                  orientation === "vertical" ? "flex flex-col" : "flex flex-row items-center"
                )}>
                <span className="text-sm font-medium whitespace-nowrap text-right">{label}</span>
                <Select value="" onValueChange={(v) => handleSelect(index, v)}>
                  <SelectTrigger className="min-w-[180px]">
                    <span className="truncate">{display}</span>
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={6}
                    className="z-50">
                    {selectAll && (
                      <SelectItem value="__all__">
                        {active.length === options.length ? "Clear all" : "Select all"}
                      </SelectItem>
                    )}

                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" readOnly checked={active.includes(opt)} />
                          <span>{opt}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SEPARATOR BETWEEN FILTERS */}
              {index < state.length - 1 && (
                <Separator
                  orientation={orientation === "vertical" ? "horizontal" : "vertical"}
                  className={orientation === "vertical" ? "my-3" : "mx-3 h-6 self-center"}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
