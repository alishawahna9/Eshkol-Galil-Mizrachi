"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { label: string; value: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  className?: string;
};

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      ref={ref}
      dir="rtl"
      className={["relative w-full", className].filter(Boolean).join(" ")}
    >
      {/* Label */}
      <div className="mb-1 text-sm font-medium text-sky-600 text-center md:text-right dark:text-sky-300">
        {label}
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full h-12
          flex items-center justify-between
          rounded-xl
          border border-slate-200
          bg-white
          px-4
          text-sm
          shadow-sm
          hover:bg-slate-50
          focus:outline-none focus:ring-2 focus:ring-sky-300/60
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-100
          dark:hover:bg-slate-800
          dark:focus:ring-sky-500/30
        "
      >
        <span className="truncate">{selected ? selected.label : "בחר"}</span>
        <ChevronDown
          className={`w-4 h-4 transition ${
            open ? "rotate-180" : ""
          } dark:text-slate-200`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-2
            w-full
            rounded-xl
            border border-slate-200
            bg-white
            shadow-lg
            overflow-hidden
            dark:border-slate-700
            dark:bg-slate-900
            dark:shadow-black/30
          "
        >
          {options.map((op) => {
            const active = op.value === value;
            return (
              <button
                key={op.value}
                type="button"
                onClick={() => {
                  onChange(op.value);
                  setOpen(false);
                }}
                className={`
                  w-full
                  flex items-center justify-between
                  px-4 py-2
                  text-sm
                  hover:bg-sky-50
                  ${active ? "bg-sky-100 font-medium" : ""}
                  dark:text-slate-100
                  dark:hover:bg-slate-800
                  ${active ? "dark:bg-slate-800" : ""}
                `}
              >
                <span>{op.label}</span>
                {active && (
                  <Check className="w-4 h-4 text-sky-600 dark:text-sky-300" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
