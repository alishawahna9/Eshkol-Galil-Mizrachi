
import React from 'react';

export const styles = {
  container: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md overflow-hidden",
  scrollWrapper: "max-h-[600px] overflow-y-auto",
  table: "w-full",
  thead: "sticky top-0 bg-gray-50 dark:bg-[#0F1F38] border-b border-gray-200 dark:border-gray-700",
  th: "px-6 py-4 text-right text-sm font-semibold text-[#0F1F38] dark:text-white",
  tr: "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#22A7D6]/20 transition-colors",
  trClickable: "cursor-pointer",
  trEven: "bg-white dark:bg-[#1B4C8C]",
  trOdd: "bg-gray-50/50 dark:bg-[#0F1F38]/50",
  td: "px-6 py-4 text-sm",
  tdCenter: "text-center",
  tdRight: "text-right",
  tdNumeric: "font-semibold text-[#22A7D6] dark:text-[#6FD1F5]",
  tdText: "text-gray-700 dark:text-gray-200",
  colorIndicator: "flex items-center gap-2",
  colorDot: "w-4 h-4 rounded-full border-2 border-white shadow-sm"
};

export default function DataTable({ data = [], columns = [], onRowClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx}
                  className={styles.th}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr 
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={`${styles.tr} ${
                  onRowClick ? styles.trClickable : ''
                } ${
                  rowIdx % 2 === 0 ? styles.trEven : styles.trOdd
                }`}
              >
                {columns.map((col, colIdx) => (
                  <td 
                    key={colIdx}
                    className={`${styles.td} ${
                      col.align === 'center' ? styles.tdCenter : styles.tdRight
                    } ${
                      col.numeric ? styles.tdNumeric : styles.tdText
                    }`}
                  >
                    {col.key === 'name' && row.color ? (
                      <div className={styles.colorIndicator}>
                        <div 
                          className={styles.colorDot}
                          style={{ backgroundColor: row.color }}
                        />
                        <span>{row[col.key]}</span>
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
