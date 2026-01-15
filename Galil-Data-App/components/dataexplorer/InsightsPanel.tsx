"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { TopGenderApiResponse } from "./dataexplorer-service";

type Props = {
  genderData: TopGenderApiResponse;
  splitBy: string;
  municipalStatusLabel?: string;
  clusterScopeLabel?: string;
};

/**
 * Configuration mapping for different metric types.
 * Maps splitBy values to their corresponding data keys and display names.
 */
const METRIC_CONFIG = {
  top_women: { key: "women" as const, name: "נשים" },
  top_men: { key: "men" as const, name: "גברים" },
  top_people: { key: "people" as const, name: "תושבים" },
} as const;

/**
 * Generates automatic insights for top N authorities data.
 *
 * Creates 3-4 insights:
 * 1. Leading authority with count and percentage
 * 2. Gap between 1st and 2nd place (if exists)
 * 3. Percentage of total represented by displayed authorities
 * 4. Ratio between first and last authority (if multiple exist)
 *
 */
function generateTopInsights<T extends Record<string, any>>(
  rows: T[],
  total: number,
  metricName: string,
  metricKey: string,
  statusSuffix: string,
  scopeText: string
): string[] {
  if (rows.length === 0) return [];

  const top = rows[0];
  const topValue = top[metricKey] as number;
  const insights = [
    `${top.name} מובילה עם ${topValue.toLocaleString(
      "he-IL"
    )} ${metricName} (${((topValue / total) * 100).toFixed(1)}%)`,
  ];

  if (rows.length > 1) {
    const second = rows[1];
    const secondValue = second[metricKey] as number;
    const gap = topValue - secondValue;
    insights.push(
      `הפער למקום השני (${second.name}) הוא ${gap.toLocaleString(
        "he-IL"
      )} ${metricName} (${((gap / secondValue) * 100).toFixed(1)}% יותר)`
    );
  }

  const topSum = rows.reduce((sum, row) => sum + (row[metricKey] as number), 0);
  insights.push(
    `${
      rows.length >= 10 ? "10 הרשויות המובילות" : "הרשויות המובילות"
    } מכילות ${((topSum / total) * 100).toFixed(
      1
    )}% מכלל ה${metricName} ${scopeText}${statusSuffix}`
  );

  // Ratio between first and last authority
  if (rows.length > 1) {
    const lastAuthority = rows[rows.length - 1];
    const lastValue = lastAuthority[metricKey] as number;
    const ratio = (topValue / lastValue).toFixed(1);

    // Hebrew ordinal numbers for positions 2-10
    const ordinals: Record<number, string> = {
      2: "השנייה",
      3: "השלישית",
      4: "הרביעית",
      5: "החמישית",
      6: "השישית",
      7: "השביעית",
      8: "השמינית",
      9: "התשיעית",
      10: "העשירית",
    };
    const position = ordinals[rows.length] || `ה-${rows.length}`;

    insights.push(
      `${top.name} גדולה פי ${ratio} מ-${lastAuthority.name} (הרשות ${position})`
    );
  }

  return insights;
}

/**
 * InsightsPanel - Displays automatic insights based on the selected data view.
 *
 * Generates contextual insights that change based on:
 * - splitBy: gender_distribution, top_women, top_men, or top_people
 * - municipalStatusLabel: filters by municipal status (city/council/etc.)
 * - clusterScopeLabel: scope of analysis (cluster vs nationwide)
 *
 * For gender_distribution: Shows total population breakdown and gender comparison.
 * For top_* views: Shows insights about leading authorities, gaps, and ratios.
 */
export default function InsightsPanel({
  genderData,
  splitBy,
  municipalStatusLabel,
  clusterScopeLabel,
}: Props) {
  const insights = useMemo(() => {
    const statusSuffix =
      municipalStatusLabel && municipalStatusLabel !== "כל המעמדות"
        ? ` (${municipalStatusLabel})`
        : "";
    const scopePrefix = clusterScopeLabel || "באשכול גליל מזרחי";
    const scopeText = clusterScopeLabel ? `ב${clusterScopeLabel}` : "באשכול";

    // Special case: gender distribution shows aggregate statistics for the entire cluster
    if (splitBy === "gender_distribution") {
      const { totalWomen } = genderData.women;
      const { totalMen } = genderData.men;
      const total = totalWomen + totalMen;
      const diff = Math.abs(totalWomen - totalMen);

      return [
        `${scopePrefix} יש ${total.toLocaleString(
          "he-IL"
        )} תושבים${statusSuffix}`,
        `${((totalWomen / total) * 100).toFixed(
          1
        )}% נשים (${totalWomen.toLocaleString("he-IL")}) ו-${(
          (totalMen / total) *
          100
        ).toFixed(1)}% גברים (${totalMen.toLocaleString("he-IL")})`,
        `יש ${diff.toLocaleString("he-IL")} ${
          totalWomen > totalMen ? "נשים יותר מגברים" : "גברים יותר מנשים"
        }`,
      ];
    }

    // For top_women, top_men, top_people: generate insights about leading authorities
    const config = METRIC_CONFIG[splitBy as keyof typeof METRIC_CONFIG];

    if (!config) return [];

    if (config.key === "women") {
      return generateTopInsights(
        genderData.women.rows,
        genderData.women.totalWomen,
        config.name,
        config.key,
        statusSuffix,
        scopeText
      );
    }

    if (config.key === "men") {
      return generateTopInsights(
        genderData.men.rows,
        genderData.men.totalMen,
        config.name,
        config.key,
        statusSuffix,
        scopeText
      );
    }

    if (config.key === "people") {
      return generateTopInsights(
        genderData.people.rows,
        genderData.people.totalPeople,
        config.name,
        config.key,
        statusSuffix,
        scopeText
      );
    }

    return [];
  }, [genderData, splitBy, municipalStatusLabel, clusterScopeLabel]);

  return (
    <Card className="mt-4" dir="rtl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          תובנות אוטומטיות
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Insights list */}
        <ul className="space-y-2">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="text-sm">{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
