// Value presentation modes used across all metrics (women / men / people):
// either an absolute count or a percentage out of the total for that metric.
export const VALUE_KINDS = ["number", "percent"] as const;
export type ValueKind = (typeof VALUE_KINDS)[number];

// Single authority row: authority name and number of women.
export type TopWomenAuthorityRow = {
  name: string;
  women: number;
};

// Single authority row: authority name and number of men.
export type TopMenAuthorityRow = {
  name: string;
  men: number;
};

// Single authority row: authority name and total people (men + women).
export type TopPeopleAuthorityRow = {
  name: string;
  people: number;
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

export type TopWomenResponse = {
  rows: TopWomenAuthorityRow[];
  totalWomen: number;
};

export type TopMenResponse = {
  rows: TopMenAuthorityRow[];
  totalMen: number;
};

export type TopPeopleResponse = {
  rows: TopPeopleAuthorityRow[];
  totalPeople: number;
};

// Default labels for the "metric selection" filter.
export const TOP_WOMEN_METRIC_LABEL = "לפי נשים – 10 הרשויות המובילות";
export const TOP_MEN_METRIC_LABEL = "לפי גברים – 10 הרשויות המובילות";
export const TOP_PEOPLE_METRIC_LABEL = "לפי תושבים – 10 הרשויות המובילות";
export const TOP_GENDER_DISTRIBUTION_LABEL = "התפלגות לפי מגדר";

// Fixed set of municipal status values used for filtering.
// These must match the values stored in AuthorityGeneralInfo.municipalStatus.
export const MUNICIPAL_STATUS_OPTIONS = [
  { label: "כל המעמדות", value: "all" },
  { label: "עירייה", value: "עירייה" },
  { label: "מועצה מקומית", value: "מועצה מקומית" },
  { label: "מועצה אזורית", value: "מועצה אזורית" },
] as const;

// Cluster scope options: either only cluster authorities or all Israeli authorities.
export const CLUSTER_SCOPE_OPTIONS = [
  { label: "אשכול גליל מזרחי", value: "cluster" },
  { label: "כל הארץ", value: "nationwide" },
] as const;

/**
 * Builds the dropdown options for the Data Explorer filters.
 * - splitOptions: which metric to show (top women / top men / top people).
 * - contentTypeOptions: how to display values (absolute number / percent).
 * There is intentionally no year filter – all metrics are aggregated over all years.
 */
export function getDataExplorerOptions() {
  return {
    splitOptions: [
      { label: TOP_WOMEN_METRIC_LABEL, value: "top_women" },
      { label: TOP_MEN_METRIC_LABEL, value: "top_men" },
      { label: TOP_PEOPLE_METRIC_LABEL, value: "top_people" },
      { label: TOP_GENDER_DISTRIBUTION_LABEL, value: "gender_distribution" },
    ],
    statusOptions: MUNICIPAL_STATUS_OPTIONS,
    scopeOptions: CLUSTER_SCOPE_OPTIONS,
    contentTypeOptions: [
      { label: "מספרי", value: "number" },
      { label: "אחוזים", value: "percent" },
    ],
  };
}

// Rounds a number to the nearest integer when it is already very close,
// otherwise keeps a single digit after the decimal point.
function roundSmart(n: number) {
  const nearInt = Math.abs(n - Math.round(n)) < 1e-9;
  if (nearInt) return Math.round(n);
  return Math.round(n * 10) / 10;
}

// Generic helper to build chart rows (label + numeric value) from any metric
// according to the selected value kind (absolute number / percent of total).
function buildGenderChartRows<T extends { name: string }>(
  rows: T[],
  totalCount: number,
  valueKind: ValueKind,
  getCount: (row: T) => number
): ChartRow[] {
  return rows.map((row) => {
    const count = getCount(row);
    const pct = totalCount > 0 ? (count / totalCount) * 100 : 0;
    const value = valueKind === "percent" ? roundSmart(pct) : count;
    return { label: row.name, value };
  });
}

// Generic helper to build table rows (authority + displayed value as string/number)
// according to the selected value kind (absolute number / percent of total).
function buildGenderTableRows<T extends { name: string }>(
  rows: T[],
  totalCount: number,
  valueKind: ValueKind,
  getCount: (row: T) => number
): Array<Array<string | number>> {
  return rows.map((row) => {
    const count = getCount(row);
    const pct = totalCount > 0 ? (count / totalCount) * 100 : 0;
    const shown = valueKind === "percent" ? `${roundSmart(pct)}%` : count;
    return [row.name, shown];
  });
}

/**
 * Generic helper to build the chart / page title for all metrics
 * (women / men / people).
 *
 * The concrete metric helpers (women / men / people) only provide
 * the specific text fragments; this function is responsible for:
 * - choosing the correct suffix for number vs percent view,
 * - injecting the optional municipal status text when it is not "all",
 * - keeping the overall sentence structure consistent.
 */
function buildExplorerTitle(
  valueKind: ValueKind,
  municipalStatusLabel: string | undefined,
  clusterScopeLabel: string | undefined,
  {
    subjectText,
    numberText,
    percentText,
    isGenderDistribution = false,
    actualCount,
  }: {
    metricLabel: string;    // Short label that appears in the metric filter (e.g. "לפי נשים").
    subjectText: string;    // Part describing what we rank by (e.g. "מספר הנשים הגבוה ביותר").
    numberText: string;// Text used when showing absolute numbers.
    percentText: string;  // Text used when showing percentages.
    isGenderDistribution?: boolean; // Flag to indicate if this is gender distribution view
    actualCount?: number; // Actual number of authorities in the result
  }
): string {
  const valueText =
    valueKind === "percent" ? `(${percentText})` : `(${numberText})`;

  const statusSuffix =
    municipalStatusLabel && municipalStatusLabel !== "כל המעמדות"
      ? ` - מעמד מוניציפלי: ${municipalStatusLabel}`
      : "";

  const scopeSuffix = clusterScopeLabel ? ` - ${clusterScopeLabel}` : "";

  // For gender distribution, don't use "10 הרשויות עם" prefix
  if (isGenderDistribution) {
    return `${subjectText} ${valueText}${statusSuffix}${scopeSuffix}`;
  }

  // Show "10" only if there are 10 or more authorities, otherwise show without number
  const countPrefix = actualCount && actualCount >= 10 
    ? "10 הרשויות עם"
    : "הרשויות עם";

  return `${countPrefix} ${subjectText} ${valueText}${statusSuffix}${scopeSuffix}`;
}

/**
 * Takes raw DB rows (authority name + women) and produces
 * a normalized TopWomenResponse including total sum and top N rows.
 */
export function createTopWomenResponse(
  allRows: { name: string; women: number | null }[],
  limit: number = 10
): TopWomenResponse {
  const normalized: TopWomenAuthorityRow[] = allRows.map((r) => ({
    name: r.name,
    women: r.women ?? 0,
  }));

  const totalWomen = normalized.reduce((sum, r) => sum + r.women, 0);

  const rows = normalized
    .slice()
    .sort((a, b) => b.women - a.women)
    .slice(0, limit);

  return { rows, totalWomen };
}

/**
 * Takes raw DB rows (authority name + men) and produces
 * a normalized TopMenResponse including total sum and top N rows.
 */
export function createTopMenResponse(
  allRows: { name: string; men: number | null }[],
  limit: number = 10
): TopMenResponse {
  const normalized: TopMenAuthorityRow[] = allRows.map((r) => ({
    name: r.name,
    men: r.men ?? 0,
  }));

  const totalMen = normalized.reduce((sum, r) => sum + r.men, 0);

  const rows = normalized
    .slice()
    .sort((a, b) => b.men - a.men)
    .slice(0, limit);

  return { rows, totalMen };
}

/**
 * Takes raw DB rows (authority name + total people) and produces
 * a normalized TopPeopleResponse including total sum and top N rows.
 */
export function createTopPeopleResponse(
  allRows: { name: string; people: number | null }[],
  limit: number = 10
): TopPeopleResponse {
  const normalized: TopPeopleAuthorityRow[] = allRows.map((r) => ({
    name: r.name,
    people: r.people ?? 0,
  }));

  const totalPeople = normalized.reduce((sum, r) => sum + r.people, 0);

  const rows = normalized
    .slice()
    .sort((a, b) => b.people - a.people)
    .slice(0, limit);

  return { rows, totalPeople };
}

/**
 * Aggregates women data fetched from the DB into a structure the UI can render.
 *
 * - No split by year or other metrics – only women.
 * - valueKind controls whether to show percentages of total women or absolute numbers.
 */
export function buildWomenDataExplorerResult(
  response: TopWomenResponse,
  valueKind: ValueKind,
  municipalStatusLabel?: string,
  clusterScopeLabel?: string
): DataExplorerResult {
  const { rows, totalWomen } = response;

  // Build the human‑readable title for the page / chart / table.
  const title = buildExplorerTitle(valueKind, municipalStatusLabel, clusterScopeLabel, {
    metricLabel: TOP_WOMEN_METRIC_LABEL,
    subjectText: "מספר הנשים הגבוה ביותר",
    numberText: "מספר נשים",
    percentText: "אחוזים",
    actualCount: rows.length,
  });

  return buildMetricDataExplorerResult<TopWomenAuthorityRow>({
    rows,
    total: totalWomen,
    valueKind,
    title,
    tableHeaderLabel: "נשים באשכול גליל מזרחי",
    yLabelNumber: "מספר נשים",
    yLabelPercent: "אחוז נשים",
    getCount: (row) => row.women,
  });
}

/**
 * Aggregates men data fetched from the DB into a structure the UI can render.
 * Mirrors the women implementation but uses the "men" field and labels.
 */
export function buildMenDataExplorerResult(
  response: TopMenResponse,
  valueKind: ValueKind,
  municipalStatusLabel?: string,
  clusterScopeLabel?: string
): DataExplorerResult {
  const { rows, totalMen } = response;

  // Build the human‑readable title for the page / chart / table.
  const title = buildExplorerTitle(valueKind, municipalStatusLabel, clusterScopeLabel, {
    metricLabel: TOP_MEN_METRIC_LABEL,
    subjectText: "מספר הגברים הגבוה ביותר",
    numberText: "מספר גברים",
    percentText: "אחוזים",
    actualCount: rows.length,
  });

  return buildMetricDataExplorerResult<TopMenAuthorityRow>({
    rows,
    total: totalMen,
    valueKind,
    title,
    tableHeaderLabel: "גברים באשכול גליל מזרחי",
    yLabelNumber: "מספר גברים",
    yLabelPercent: "אחוז גברים",
    getCount: (row) => row.men,
  });
}

/**
 * Aggregates people data (men + women) fetched from the DB
 * into a structure the UI can render.
 */
export function buildPeopleDataExplorerResult(
  response: TopPeopleResponse,
  valueKind: ValueKind,
  municipalStatusLabel?: string,
  clusterScopeLabel?: string
): DataExplorerResult {
  const { rows, totalPeople } = response;

  // Build the human‑readable title for the page / chart / table.
  const title = buildExplorerTitle(valueKind, municipalStatusLabel, clusterScopeLabel, {
    metricLabel: TOP_PEOPLE_METRIC_LABEL,
    subjectText: "מספר התושבים הגבוה ביותר",
    numberText: "מספר אנשים",
    percentText: "אחוזים",
    actualCount: rows.length,
  });

  return buildMetricDataExplorerResult<TopPeopleAuthorityRow>({
    rows,
    total: totalPeople,
    valueKind,
    title,
    tableHeaderLabel: "אנשים באשכול גליל מזרחי",
    yLabelNumber: "מספר תושבים",
    yLabelPercent: "אחוז תושבים",
    getCount: (row) => row.people,
  });
}

/**
 * Builds a gender distribution view (two bars: women vs men) based on the
 * pre-aggregated totals from TopWomenResponse and TopMenResponse.
 *
 * - When valueKind = "number" it shows absolute counts of women / men.
 * - When valueKind = "percent" it shows each gender as % of (women + men).
 * - Still respects the municipal status filter via the pre-filtered responses.
 */
export function buildGenderDistributionResult(
  womenResponse: TopWomenResponse,
  menResponse: TopMenResponse,
  valueKind: ValueKind,
  municipalStatusLabel?: string,
  clusterScopeLabel?: string
): DataExplorerResult {
  const totalWomen = womenResponse.totalWomen;
  const totalMen = menResponse.totalMen;
  const grandTotal = totalWomen + totalMen;

  const title = buildExplorerTitle(valueKind, municipalStatusLabel, clusterScopeLabel, {
    metricLabel: TOP_GENDER_DISTRIBUTION_LABEL,
    subjectText: "השוואת אוכלוסייה לפי מגדר באשכול גליל מזרחי",
    numberText: "מספר תושבים",
    percentText: "אחוזים",
    isGenderDistribution: true,
  });

  const toValue = (count: number) => {
    if (valueKind === "percent") {
      const pct = grandTotal > 0 ? (count / grandTotal) * 100 : 0;
      return roundSmart(pct);
    }
    return count;
  };

  const womenValue = toValue(totalWomen);
  const menValue = toValue(totalMen);

  const rows: ChartRow[] = [
    { label: "נשים", value: womenValue },
    { label: "גברים", value: menValue },
  ];

  const tableHeaders = [
    "מגדר",
    valueKind === "percent"
      ? "אחוז תושבים באשכול גליל מזרחי"
      : "מספר תושבים באשכול גליל מזרחי",
  ];

  const tableRows: Array<Array<string | number>> = [
    [
      "נשים",
      valueKind === "percent" ? `${womenValue}%` : totalWomen,
    ],
    [
      "גברים",
      valueKind === "percent" ? `${menValue}%` : totalMen,
    ],
  ];

  const maxValue = rows.reduce(
    (max, row) => (row.value > max ? row.value : max),
    0
  );

  const tickStep =
    valueKind === "percent" ? 5 : Math.max(1, Math.round(maxValue / 10));

  return {
    title,
    rows,
    tableHeaders,
    tableRows,
    xLabel: "מגדר",
    yLabel: valueKind === "percent" ? "אחוז תושבים" : "מספר תושבים",
    tickStep,
  };
}

// Generic helper to build a full DataExplorerResult for any metric
// (women, men, or people) using shared logic for sorting, chart data and table data.
function buildMetricDataExplorerResult<T extends { name: string }>(params: {
  rows: T[];
  total: number;
  valueKind: ValueKind;
  title: string;
  tableHeaderLabel: string;
  yLabelNumber: string;
  yLabelPercent: string;
  getCount: (row: T) => number;
}): DataExplorerResult {
  const {
    rows,
    total,
    valueKind,
    title,
    tableHeaderLabel,
    yLabelNumber,
    yLabelPercent,
    getCount,
  } = params;

  // Sort by metric value, highest first, while keeping the original
  // array untouched (slice() + sort()).
  const sorted = rows
    .slice()
    .sort((a, b) => getCount(b) - getCount(a));

  const tableHeaders = ["רשות", tableHeaderLabel];
  const chartRows = buildGenderChartRows(sorted, total, valueKind, getCount);
  const tableRows = buildGenderTableRows(sorted, total, valueKind, getCount);

  const maxValue = chartRows.reduce(
    (max, row) => (row.value > max ? row.value : max),
    0
  );

  const tickStep =
    valueKind === "percent" ? 5 : Math.max(1, Math.round(maxValue / 10));

  return {
    title,
    rows: chartRows,
    tableHeaders,
    tableRows,
    xLabel: "רשות מקומית",
    yLabel: valueKind === "percent" ? yLabelPercent : yLabelNumber,
    tickStep,
  };
}

// Combined API payload returned by /api/dataexplorer.
// Exposes pre-aggregated "top 10" views for women, men and people
// so the client can switch metrics without additional round-trips.
export type TopGenderApiResponse = {
  women: TopWomenResponse;
  men: TopMenResponse;
  people: TopPeopleResponse;
};
