// components/GlilElectricityTable.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

// Generic table props:
// - headers: list of column titles.
// - rows: each inner array represents a single row, cells follow headers order.
// - title: optional title bar shown above the table.
// - className / tableClassName: style hooks for the outer container and the table.
type Props = {
  title?: string;
  headers: string[];
  rows: (string | number)[][]; // each row matches headers order
  className?: string;
  tableClassName?: string;
  enableSearch?: boolean;
  searchPlaceholder?: string;
};

// A reusable right-to-left styled table component used in the Data Explorer.
// It renders headers and rows and formats numeric cells with thousand separators.
export default function GlilElectricityTable({
  title,
  headers,
  rows,
  className,
  tableClassName,
  enableSearch,
  searchPlaceholder,
}: Props) {
  // Local search query used to filter the visible rows in the table.
  const [query, setQuery] = React.useState("");
  // Compute the rows that match the current search query.
  // This runs on the client only and never touches the server.
  const filteredRows = React.useMemo(() => {
    const trimmed = query.trim();

    // Filter by authority name (first column), but allow matching any cell in the row.
    return rows.filter((row) =>
      row.some((cell) => String(cell).includes(trimmed))
    );
  }, [rows, query]);
  return (
    <div dir="rtl" className={cn("w-fit", className)}>
      <div
        className="
          rounded-xl
          border border-slate-200
          bg-white
          shadow-sm
          overflow-hidden
          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/30
        "
      >
        {/* Search field: visually part of the card header, not the HTML <table> element. */}
        {enableSearch && (
          <div className="px-4 pt-3 pb-2 flex border-b border-slate-200 dark:border-slate-700">
            <div className="relative w-full max-w-xs" dir="rtl">
              <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder ?? "חיפוש רשות..."}
                className="pr-9 text-sm bg-white border-slate-300 shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Title bar for the table content (e.g. "10 leading authorities ..."). */}
        {title && (
          <div
            className="
              px-4 py-3
              border-b border-slate-200 dark:border-slate-700
              bg-slate-50 dark:bg-slate-800
            "
          >
            <h3 className="text-sm font-semibold text-right text-slate-900 dark:text-slate-100">
              {title}
              {/* Render the filtered rows; search only hides rows on the client side. */}
            </h3>
          </div>
        )}

        <Table className={cn("w-auto", tableClassName)}>
          <TableHeader>
            <TableRow
              className="
                bg-slate-50 hover:bg-slate-50
                dark:bg-slate-800
                dark:hover:bg-slate-800
              "
            >
              {headers.map((h, i) => (
                <TableHead
                  key={`${String(h)}-${i}`}
                  className="
                    text-center
                    font-semibold
                    px-3 py-2
                    whitespace-nowrap
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredRows.map((r, rowIdx) => (
              <TableRow
                key={rowIdx}
                className="
                  hover:bg-slate-50/60
                  dark:hover:bg-slate-800/60
                "
              >
                {r.map((cell, cellIdx) => (
                  <TableCell
                    key={cellIdx}
                    className="
                      text-center
                      px-3 py-2
                      whitespace-nowrap
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {/* Numbers are formatted with locale-aware thousand separators. */}
                    {typeof cell === "number"
                      ? cell.toLocaleString("he-IL")
                      : cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
