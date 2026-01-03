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

type Props = {
  title?: string;
  headers: string[];
  rows: (string | number)[][]; // each row matches headers order
  className?: string;
  tableClassName?: string;
};

export default function GlilElectricityTable({
  title,
  headers,
  rows,
  className,
  tableClassName,
}: Props) {
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
        {/* Optional title bar similar to AuthoritiesTable */}
        {title && (
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-right text-slate-900 dark:text-slate-100">
              {title}
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
            {rows.map((r, rowIdx) => (
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
                    {cell}
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
