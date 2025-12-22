// components/ui/FilterDropdown.tsx
"use client";

import * as React from "react";

type Option = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
  disabled,
  className,
}: Props) {
  return (
    <div
      dir="rtl"
      className={["flex flex-col gap-2 w-full", className].filter(Boolean).join(" ")}
    >
      {/* Label (mobile: centered, desktop: right aligned) */}
      <div className="text-sm font-medium text-sky-600 dark:text-sky-400 text-center md:text-right">
        {label}
      </div>

      <div className="relative w-full">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            h-14 md:h-11
            rounded-2xl md:rounded-xl
            border
            px-5
            text-base md:text-sm
            outline-none
            appearance-none
            transition
            bg-white text-slate-900 border-slate-200
            shadow-sm
            focus:ring-2 focus:ring-sky-300/60
            focus:border-sky-300
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700
            dark:shadow-none
            dark:focus:ring-sky-500/25
            dark:focus:border-sky-500/40
          "
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg md:text-base">
          ▾
        </span>
      </div>
    </div>
  );
}