import React from "react"
import { cn } from "@/lib/utils"

export function Table({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return <thead className="border-b">{children}</thead>
}

export function TableBody({
  children,
}: {
  children: React.ReactNode
}) {
  return <tbody>{children}</tbody>
}

export function TableRow({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <tr
      className={cn(
        "border-b last:border-0 hover:bg-muted/50 transition-colors",
        className
      )}
    >
      {children}
    </tr>
  )
}

export function TableHead({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <th
      className={cn(
        "px-2 py-2 text-left font-medium text-foreground",
        className
      )}
    >
      {children}
    </th>
  )
}

export function TableCell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <td
      className={cn(
        "px-2 py-2 align-middle",
        className
      )}
    >
      {children}
    </td>
  )
}
