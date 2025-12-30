import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type AuthorityRow = {
  name: string;
  value: number;
};

type Props = {
  title?: string;
  data: AuthorityRow[];
};

export default function AuthoritiesTable({
  title = "פירוט רשויות",
  data,
}: Props) {
  return (
    <div
      dir="rtl"
      className="
        h-full
        bg-card
        rounded-2xl
        border border-border
        shadow-sm
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      {/* TABLE */}
      <div className="h-[calc(100%-52px)] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שם הרשות</TableHead>
              <TableHead className="text-left">ערך</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                className="hover:bg-muted/50 transition"
              >
                <TableCell className="font-medium">
                  {row.name}
                </TableCell>

                <TableCell className="text-left tabular-nums">
                  {row.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-sm text-muted-foreground py-6"
                >
                  אין נתונים להצגה
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
