"use client";

import {useState} from "react";
import {FilterDropdown} from "@/components/filter-dropdown";
import type {FilterItem} from "@/types/filter";

export type LifeIndexFiltersState = FilterItem[];

type Props = {
  onChange: (filters: LifeIndexFiltersState) => void;
};

export function LifeIndexFilter({onChange}: Props) {
  const [filters, setFilters] = useState<LifeIndexFiltersState>([
    {
      label: "מדד",
      placeholder: "הכל",
      options: ["הכל", "מדד איכות חיים", "שביעות רצון"],
      active: ["הכל"],
      selectAll: false,
    },
    {
      label: "קבוצת גיל",
      placeholder: "הכל",
      options: ["18-30", "31-50", "51+"],
      active: ["הכל"],
      selectAll: false,
    },
    {
      label: "מידת דתיות",
      placeholder: "הכל",
      options: ["חילונים", "דתיים", "חרדים"],
      active: ["הכל"],
      selectAll: false,
    },
    {
      label: "קבוצת אוכלוסייה",
      placeholder: "הכל",
      options: ["יהודים", "ערבים"],
      active: ["הכל"],
      selectAll: false,
    },
  ]);

  const handleChange = (next: LifeIndexFiltersState) => {
    setFilters(next);
    onChange(next);
  };

  return (
    <FilterDropdown
      title="סינון נתונים"
      filters={filters}
      orientation="horizontal"
      onSelectAction={handleChange}
    />
  );
}
