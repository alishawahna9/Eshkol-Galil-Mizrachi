"use client";

import * as React from "react";

type Option = { label: string; value: string };

type Props = {
  label: string;                // למשל: "פילוח ראשי"
  value: string;                // הערך הנבחר
  options: Option[];            // רשימת אפשרויות
  onChange: (v: string) => void;
  placeholder?: string;         // אם תרצה אופציה ריקה
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
    <div className={["inline-flex flex-col gap-1", className].filter(Boolean).join(" ")} dir="rtl">
      {/* Label (כמו בתמונה) */}
      <div className="text-xs text-sky-500 font-medium text-center">
        {label}
      </div>

      {/* Select */}
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-[200px] h-10
            rounded-md border border-slate-200 bg-white
            px-3 text-sm
            outline-none
            focus:ring-2 focus:ring-sky-200
            disabled:opacity-50
            appearance-none
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
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>
    </div>
  );
}
