"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{ left: number; top: number; width: number } | null>(null);

  const selected = options.find((o) => o.value === value);

  // close on outside click (works across portal)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (wrapperRef.current && wrapperRef.current.contains(target)) ||
        (triggerRef.current && triggerRef.current.contains(target)) ||
        (dropdownRef.current && dropdownRef.current.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // compute menu position when opened and on resize/scroll
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const update = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setMenuStyle({ left: rect.left + window.scrollX, top: rect.bottom + window.scrollY, width: rect.width });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      dir="rtl"
      className={["relative w-full", className].filter(Boolean).join(" ")}
    >
      {/* Label */}
      <div className="mb-1 text-sm font-medium text-sky-600 text-center md:text-right">
        {label}
      </div>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full h-12
          flex items-center justify-between
          rounded-xl
          border border-border
          bg-card
          px-4
          text-sm
          shadow-sm
          hover:bg-muted/30
          focus:outline-none focus:ring-2 focus:ring-sky-300/60
        "
      >
        <span className="truncate">
          {selected ? selected.label : "בחר"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown (portal) */}
      {open && menuStyle && createPortal(
        <div
          ref={dropdownRef}
          style={{ left: menuStyle.left, top: menuStyle.top + 8, width: menuStyle.width }}
          className="z-[9999] absolute rounded-xl border border-border bg-card shadow-lg overflow-hidden"
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
                  hover:bg-muted/30
                  ${active ? "bg-muted/50 font-medium" : ""}
                `}
              >
                <span>{op.label}</span>
                {active && <Check className="w-4 h-4 text-sky-600" />}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}
