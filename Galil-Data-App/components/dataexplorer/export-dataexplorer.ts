// Export data explorer report to Excel

import { DataExplorerResult, TopGenderApiResponse } from "./dataexplorer-service";

type ExportParams = {
  result: DataExplorerResult;
  genderData: TopGenderApiResponse;
  splitBy: string;
};

/**
 * Exports Data Explorer report to Excel (.xls) format.
 * 
 * Creates an HTML-based Excel file with:
 * - Report title and date
 * - Table with authority names, counts, and percentages
 * - Total row summarizing all displayed data
 * 
 * Handles two export types:
 * 1. Gender distribution - exports women/men totals for the cluster
 * 2. Top authorities - exports top N authorities for the selected metric (women/men/people)
 * 
 */
export function exportDataExplorerReport({ result, genderData, splitBy }: ExportParams): void {
  // Collect data rows with actual counts
  const rows: Array<{ name: string; count: number; percent: string }> = [];

  if (splitBy === "gender_distribution") {
    // Gender distribution: women and men
    const womenCount = genderData.women.totalWomen;
    const menCount = genderData.men.totalMen;
    const grandTotal = womenCount + menCount;
    
    rows.push({
      name: "נשים באשכול גליל מזרחי",
      count: womenCount,
      percent: ((womenCount / grandTotal) * 100).toFixed(2)
    });
    rows.push({
      name: "גברים באשכול גליל מזרחי",
      count: menCount,
      percent: ((menCount / grandTotal) * 100).toFixed(2)
    });
  } else {
    // Top 10 authorities
    let totalCount = 0;
    if (splitBy === "top_women") {
      totalCount = genderData.women.totalWomen;
      genderData.women.rows.forEach(auth => {
        rows.push({
          name: auth.name,
          count: auth.women,
          percent: ((auth.women / totalCount) * 100).toFixed(2)
        });
      });
    } else if (splitBy === "top_men") {
      totalCount = genderData.men.totalMen;
      genderData.men.rows.forEach(auth => {
        rows.push({
          name: auth.name,
          count: auth.men,
          percent: ((auth.men / totalCount) * 100).toFixed(2)
        });
      });
    } else if (splitBy === "top_people") {
      totalCount = genderData.people.totalPeople;
      genderData.people.rows.forEach(auth => {
        rows.push({
          name: auth.name,
          count: auth.people,
          percent: ((auth.people / totalCount) * 100).toFixed(2)
        });
      });
    }
  }

  // Calculate sum of displayed rows and total percentage
  const displayedSum = rows.reduce((sum, row) => sum + row.count, 0);
  const totalPercent = rows.reduce((sum, row) => sum + parseFloat(row.percent), 0).toFixed(2);

  // Format title - remove "10" prefix and add date first
  const formattedTitle = result.title.replace(/^10\s+/, '');
  const dateStr = new Date().toLocaleDateString("he-IL");

  // Build Excel-compatible HTML table
  const htmlContent = `
<html dir="rtl">
<head>
<meta charset="UTF-8">
</head>
<body>
<table border="1" style="border-collapse: collapse; width: 100%; font-family: Arial;">
  <tr>
    <td colspan="3" style="text-align: center; font-size: 14px; padding: 8px; background-color: #f0f0f0;">
      תאריך: ${dateStr}
    </td>
  </tr>
  <tr>
    <td colspan="3" style="text-align: center; font-size: 16px; font-weight: bold; padding: 10px; background-color: #f0f0f0;">
      ${formattedTitle}
    </td>
  </tr>
  <tr>
    <td colspan="3" style="height: 10px;"></td>
  </tr>
  <tr style="background-color: #4a5568; color: white; font-weight: bold;">
    <td style="text-align: center; padding: 10px;">שם הרשות</td>
    <td style="text-align: center; padding: 10px;">מספר</td>
    <td style="text-align: center; padding: 10px;">אחוז</td>
  </tr>
  ${rows.map((row, idx) => `
  <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f7fafc'};">
    <td style="text-align: center; padding: 8px;">${row.name}</td>
    <td style="text-align: center; padding: 8px;">${row.count.toLocaleString('he-IL')}</td>
    <td style="text-align: center; padding: 8px;">${row.percent}%</td>
  </tr>
  `).join('')}
  <tr style="background-color: #e2e8f0; font-weight: bold; font-size: 14px;">
    <td style="text-align: center; padding: 10px; border-top: 2px solid #000;">סך הכל</td>
    <td style="text-align: center; padding: 10px; border-top: 2px solid #000;">${displayedSum.toLocaleString('he-IL')}</td>
    <td style="text-align: center; padding: 10px; border-top: 2px solid #000;">${totalPercent}%</td>
  </tr>
</table>
</body>
</html>`;

  // Create blob and download as Excel file
  const blob = new Blob(["\uFEFF" + htmlContent], { 
    type: 'application/vnd.ms-excel;charset=utf-8' 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `דוח_${splitBy}_${new Date().toISOString().split("T")[0]}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
