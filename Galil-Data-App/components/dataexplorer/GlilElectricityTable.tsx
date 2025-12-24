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
  headers: string[];
  rows: (string | number)[][]; // each row matches headers order
  className?: string;
  tableClassName?: string;
};

export default function GlilElectricityTable({
  headers,
  rows,
  className,
  tableClassName,
}: Props) {
  return (
    <div dir="rtl" className={cn("w-fit", className)}>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table className={cn("w-auto", tableClassName)}>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              {headers.map((h, i) => (
                <TableHead
                  key={`${String(h)}-${i}`}
                  className="text-center font-semibold px-3 py-2 whitespace-nowrap"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r, rowIdx) => (
              <TableRow key={rowIdx} className="hover:bg-slate-50/60">
                {r.map((cell, cellIdx) => (
                  <TableCell
                    key={cellIdx}
                    className="text-center px-3 py-2 whitespace-nowrap"
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
