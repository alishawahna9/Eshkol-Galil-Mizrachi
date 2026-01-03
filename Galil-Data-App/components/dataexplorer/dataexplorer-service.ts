// lib/dataexplorer-service.ts

// Supported years for the data explorer.
export const YEARS = ["2021", "2022", "2023"] as const;
export type Year = (typeof YEARS)[number];

// Dimensions by which we can split the data (religion, age, etc.).
export const SPLITS = ["דת", "גיל", "מגדר", "מחוז", "חוזרים בתשובה"] as const;
export type SplitKey = (typeof SPLITS)[number];

// Ways to present the metric values: absolute number or percent of total.
export const VALUE_KINDS = ["number", "percent"] as const;
export type ValueKind = (typeof VALUE_KINDS)[number];

// Current selection of filters that drive the explorer UI and calculations.
export type DataExplorerFilters = {
  year: Year;
  splitBy: SplitKey;
  valueKind: ValueKind;
  metricLabel?: string;
};

// Shape of a single raw data record (before conversion to chart rows).
export type FakeDataPoint = {
  year: Year;
  splitBy: SplitKey;
  category: string;
  number: number;
};

// Minimal shape consumed by the chart component.
export type ChartRow = {
  label: string;
  value: number;
};

// Aggregated result returned to the UI layer.
export type DataExplorerResult = {
  title: string;
  rows: ChartRow[];
  tableHeaders: string[];
  tableRows: Array<Array<string | number>>;
  xLabel: string;
  yLabel: string;
  tickStep: number;
};

/**
 * Build dropdown options for the data explorer filters (split, value kind, year).
 */
export function getDataExplorerOptions() {
  return {
    splitOptions: SPLITS.map((s) => ({ label: s, value: s })),
    contentTypeOptions: [
      { label: "מספרי", value: "number" },
      { label: "אחוזים", value: "percent" },
    ],
    // Options for the year filter.
    yearsOptions: YEARS.map((y) => ({ label: y, value: y })),
  };
}

// Mock data used by the explorer (can later be replaced by real DB/API data).
export const DATAEXPLORER_FAKE_DATA: FakeDataPoint[] = [
  // ===== 2021 =====
  { year: "2021", splitBy: "דת", category: "יהודי", number: 1800 },
  { year: "2021", splitBy: "דת", category: "מוסלמי", number: 1600 },
  { year: "2021", splitBy: "דת", category: "נוצרי", number: 400 },
  { year: "2021", splitBy: "דת", category: "דרוזי", number: 700 },


{ year: "2021", splitBy: "גיל", category: "25 - 29", number: 2850 },
{ year: "2021", splitBy: "גיל", category: "30 - 34", number: 3120 },
{ year: "2021", splitBy: "גיל", category: "34 - 39", number: 2980 },
{ year: "2021", splitBy: "גיל", category: "50 - 54", number: 2410 },
{ year: "2021", splitBy: "גיל", category: "60 - 64", number: 1760 },
{ year: "2021", splitBy: "גיל", category: "65 - 74", number: 1320 },
{ year: "2021", splitBy: "גיל", category: "75+", number: 980 },

  { year: "2021", splitBy: "מגדר", category: "זכר", number: 1200 },
  { year: "2021", splitBy: "מגדר", category: "נקבה", number: 2600 },

  { year: "2021", splitBy: "מחוז", category: "צפון", number: 1950 },

  { year: "2021", splitBy: "חוזרים בתשובה", category: "לא", number: 2100 },
  { year: "2021", splitBy: "חוזרים בתשובה", category: "כן", number: 2400 },

  // ===== 2022 =====
  { year: "2022", splitBy: "דת", category: "יהודי", number: 2000 },
  { year: "2022", splitBy: "דת", category: "מוסלמי", number: 1700 },
  { year: "2022", splitBy: "דת", category: "נוצרי", number: 450 },
  { year: "2022", splitBy: "דת", category: "דרוזי", number: 2200 },

  { year: "2022", splitBy: "גיל", category: "25 - 29", number: 2920 },
  { year: "2022", splitBy: "גיל", category: "30 - 34", number: 3250 },
  { year: "2022", splitBy: "גיל", category: "34 - 39", number: 3050 },
  { year: "2022", splitBy: "גיל", category: "50 - 54", number: 2550 },
  { year: "2022", splitBy: "גיל", category: "60 - 64", number: 1890 },
  { year: "2022", splitBy: "גיל", category: "65 - 74", number: 1410 },
  { year: "2022", splitBy: "גיל", category: "75+", number: 1060 },

  { year: "2022", splitBy: "מגדר", category: "זכר", number: 1300 },
  { year: "2022", splitBy: "מגדר", category: "נקבה", number: 2800 },

  { year: "2022", splitBy: "מחוז", category: "צפון", number: 2100 },

  { year: "2022", splitBy: "חוזרים בתשובה", category: "לא", number: 2300 },
  { year: "2022", splitBy: "חוזרים בתשובה", category: "כן", number: 2500 },

  // ===== 2023 =====
  { year: "2023", splitBy: "דת", category: "יהודי", number: 2100 },
  { year: "2023", splitBy: "דת", category: "מוסלמי", number: 1750 },
  { year: "2023", splitBy: "דת", category: "נוצרי", number: 480 },
  { year: "2023", splitBy: "דת", category: "דרוזי", number: 2350 },

  { year: "2023", splitBy: "גיל", category: "25 - 29", number: 3010 },
  { year: "2023", splitBy: "גיל", category: "30 - 34", number: 3390 },
  { year: "2023", splitBy: "גיל", category: "34 - 39", number: 3170 },
  { year: "2023", splitBy: "גיל", category: "50 - 54", number: 2680 },
  { year: "2023", splitBy: "גיל", category: "60 - 64", number: 2010 },
  { year: "2023", splitBy: "גיל", category: "65 - 74", number: 1520 },
  { year: "2023", splitBy: "גיל", category: "75+", number: 1180 },

  { year: "2023", splitBy: "מגדר", category: "זכר", number: 1400 },
  { year: "2023", splitBy: "מגדר", category: "נקבה", number: 2900 },

  { year: "2023", splitBy: "מחוז", category: "צפון", number: 2250 },

  { year: "2023", splitBy: "חוזרים בתשובה", category: "לא", number: 2400 },
  { year: "2023", splitBy: "חוזרים בתשובה", category: "כן", number: 2600 },
];

function roundSmart(n: number) {
  // Round to an integer when the number is very close to it,
  // otherwise keep a single digit after the decimal point.
  const nearInt = Math.abs(n - Math.round(n)) < 1e-9;
  if (nearInt) return Math.round(n);
  return Math.round(n * 10) / 10;
}

// Build the chart rows (label + numeric value) from raw data points
// according to the selected value kind (number / percent of total).
function buildChartRows(
  filtered: FakeDataPoint[],
  sum: number,
  valueKind: ValueKind
): ChartRow[] {
  return filtered.map((d) => {
    const pct = sum > 0 ? (d.number / sum) * 100 : 0;
    const value = valueKind === "percent" ? roundSmart(pct) : d.number;
    return { label: d.category, value };
  });
}

// Build the table rows (category + displayed value as string/number)
// according to the selected value kind (number / percent of total).
function buildTableRows(
  filtered: FakeDataPoint[],
  sum: number,
  valueKind: ValueKind
): Array<Array<string | number>> {
  return filtered.map((d) => {
    const pct = sum > 0 ? (d.number / sum) * 100 : 0;
    const shown =
      valueKind === "percent" ? `${roundSmart(pct)}%` : d.number;
    return [d.category, shown];
  });
}

/**
 * Build the chart/page title according to the current filters.
 * If no custom metric label is provided, we fall back to a default text.
 */
export function buildExplorerTitle(filters: DataExplorerFilters) {
  const metric = filters.metricLabel ?? "מוגבלות תפקודית חמורה";

  // Decide whether to show the units as percent or absolute number of people.
  const valueText = filters.valueKind === "percent" ? "(אחוזים)" : "(סה״כ אנשים)";

  // Build a human‑readable Hebrew title using all filters.
  return `אנשים בעלי ${metric} ${valueText} בשנת ${filters.year} באשכול גליל מזרחי, בפילוח לפי ${filters.splitBy}`;
}

/**
 * Aggregate raw data points into a structure that the explorer UI can render.
 *
 * - Filters the raw data by year and split.
 * - Computes percentages when needed.
 * - Returns both chart rows and table rows, plus labels and title.
 */
export function getDataExplorerResult(
  filters: DataExplorerFilters,
  data: FakeDataPoint[] = DATAEXPLORER_FAKE_DATA
): DataExplorerResult {
  const filtered = data
    .filter((d) => d.year === filters.year && d.splitBy === filters.splitBy)
    .slice()
    .sort((a, b) => b.number - a.number);

  const sum = filtered.reduce((acc, d) => acc + d.number, 0);
  const tableHeaders = [filters.splitBy, "אשכול גליל מזרחי"];
  const rows = buildChartRows(filtered, sum, filters.valueKind);
  const tableRows = buildTableRows(filtered, sum, filters.valueKind);

  return {
    title: buildExplorerTitle(filters),
    rows,
    tableHeaders,
    tableRows,
    xLabel: filters.splitBy,
    yLabel: filters.valueKind === "percent" ? "אחוזים" : "כמות",
    tickStep: filters.valueKind === "percent" ? 5 : 25,
  };
}
