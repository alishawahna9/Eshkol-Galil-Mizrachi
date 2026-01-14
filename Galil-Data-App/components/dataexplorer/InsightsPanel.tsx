"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { TopGenderApiResponse } from "./dataexplorer-service";

type Props = {
  genderData: TopGenderApiResponse;
  splitBy: string; // Current metric: 'gender_distribution', 'top_women', 'top_men', or 'top_people'
  municipalStatusLabel?: string; // Label of selected municipal status filter
  clusterScopeLabel?: string; // Label of selected cluster scope (cluster/nationwide)
};

/**
 * InsightsPanel component - displays automatic insights based on the current data view
 * Generates different insights depending on the selected metric (women/men/people/gender distribution)
 */
export default function InsightsPanel({
  genderData,
  splitBy,
  municipalStatusLabel,
  clusterScopeLabel,
}: Props) {
  const insights: string[] = []; // Array to store generated insight messages

  // Condition: When viewing overall gender distribution across all authorities
  // Provides: Total population count, gender percentages, and which gender has more people
  if (splitBy === "gender_distribution") {
    // Generate insights for gender distribution view
    const totalWomen = genderData.women.totalWomen;
    const totalMen = genderData.men.totalMen;
    const total = totalWomen + totalMen;
    const womenPercent = ((totalWomen / total) * 100).toFixed(1);
    const menPercent = ((totalMen / total) * 100).toFixed(1);

    // Build status suffix for insights when a specific municipal status is selected
    const statusSuffix =
      municipalStatusLabel && municipalStatusLabel !== "כל המעמדות"
        ? ` (${municipalStatusLabel})`
        : "";

    // Build scope prefix based on selected scope
    const scopePrefix = clusterScopeLabel || "באשכול גליל מזרחי";

    // Insight 1: Total population in the cluster
    insights.push(
      `${scopePrefix} יש ${total.toLocaleString("he-IL")} תושבים${statusSuffix}`
    );

    // Insight 2: Gender breakdown with percentages
    insights.push(
      `${womenPercent}% נשים (${totalWomen.toLocaleString(
        "he-IL"
      )}) ו-${menPercent}% גברים (${totalMen.toLocaleString("he-IL")})`
    );

    // Insight 3: Gender difference (which gender has more people)
    // Condition: If there are more women than men
    // Provides: The exact difference showing how many more women there are
    if (totalWomen > totalMen) {
      const diff = totalWomen - totalMen;
      insights.push(`יש ${diff.toLocaleString("he-IL")} נשים יותר מגברים`);
    } else {
      // Condition: If there are more men than women (or equal)
      // Provides: The exact difference showing how many more men there are
      const diff = totalMen - totalWomen;
      insights.push(`יש ${diff.toLocaleString("he-IL")} גברים יותר מנשים`);
    }
  } else {
    // Generate insights for top authorities view (women/men/people)
    let total = genderData.women.totalWomen;
    let metricName = "נשים"; // Default metric name in Hebrew

    // Build status suffix for insights when a specific municipal status is selected
    const statusSuffix =
      municipalStatusLabel && municipalStatusLabel !== "כל המעמדות"
        ? ` (${municipalStatusLabel})`
        : "";

    // Condition: When viewing top 10 authorities by women population
    // Provides: Leading authority stats, gap to 2nd place, top 10 concentration, and size ratio
    if (splitBy === "top_women") {
      const rows = genderData.women.rows; // Top 10 authorities by women population
      total = genderData.women.totalWomen; // Total women in all authorities

      // Condition: If there is at least one authority in the results
      // Provides: Leading authority name, value, and percentage of total
      if (rows.length > 0) {
        const topAuthority = rows[0];
        const topValue = topAuthority.women;
        const topPercent = ((topValue / total) * 100).toFixed(1);

        // Insight 1: Leading authority with its value and percentage
        insights.push(
          `${topAuthority.name} מובילה עם ${topValue.toLocaleString(
            "he-IL"
          )} ${metricName} (${topPercent}%)`
        );

        // Insight 2: Gap between first and second place
        // Condition: If there are at least 2 authorities in the results
        // Provides: Absolute and percentage gap between 1st and 2nd place authorities
        if (rows.length > 1) {
          const secondAuthority = rows[1];
          const secondValue = secondAuthority.women;
          const gap = topValue - secondValue;
          const gapPercent = ((gap / secondValue) * 100).toFixed(1);

          insights.push(
            `הפער למקום השני (${secondAuthority.name}) הוא ${gap.toLocaleString(
              "he-IL"
            )} ${metricName} (${gapPercent}% יותר)`
          );
        }

        // Insight 3: Top 10 concentration - what percentage of total do they represent
        const topSum = rows.reduce((sum, row) => sum + row.women, 0);
        const topSumPercent = ((topSum / total) * 100).toFixed(1);

        const authoritiesText =
          rows.length >= 10 ? "10 הרשויות המובילות" : "הרשויות המובילות";
        const scopeText = clusterScopeLabel
          ? `ב${clusterScopeLabel}`
          : "באשכול";
        insights.push(
          `${authoritiesText} מכילות ${topSumPercent}% מכלל ה${metricName} ${scopeText}`
        );

        // Insight 4: Ratio between largest and smallest authority in top 10
        // Condition: If there are exactly 10 authorities (full top 10 list)
        // Provides: Size ratio showing how many times larger the 1st place is compared to 10th
        if (rows.length === 10) {
          const lastAuthority = rows[rows.length - 1];
          const lastValue = lastAuthority.women;
          const ratioToFirst = (topValue / lastValue).toFixed(1);

          insights.push(
            `${topAuthority.name} גדולה פי ${ratioToFirst} מ-${lastAuthority.name} (הרשות העשירית)`
          );
        }
      }
    } else if (splitBy === "top_men") {
      // Condition: When viewing top 10 authorities by men population
      // Provides: Same insights as top_women but for men (leading authority, gaps, concentration, ratio)
      const rows = genderData.men.rows; // Top 10 authorities by men population
      total = genderData.men.totalMen; // Total men in all authorities
      metricName = "גברים"; // Update metric name to "men" in Hebrew

      // Condition: If there is at least one authority in the results
      // Provides: Leading authority name, value, and percentage of total men
      if (rows.length > 0) {
        const topAuthority = rows[0];
        const topValue = topAuthority.men;
        const topPercent = ((topValue / total) * 100).toFixed(1);

        insights.push(
          `${topAuthority.name} מובילה עם ${topValue.toLocaleString(
            "he-IL"
          )} ${metricName} (${topPercent}%)`
        );

        // Condition: If there are at least 2 authorities in the results
        // Provides: Absolute and percentage gap between 1st and 2nd place for men
        if (rows.length > 1) {
          const secondAuthority = rows[1];
          const secondValue = secondAuthority.men;
          const gap = topValue - secondValue;
          const gapPercent = ((gap / secondValue) * 100).toFixed(1);

          insights.push(
            `הפער למקום השני (${secondAuthority.name}) הוא ${gap.toLocaleString(
              "he-IL"
            )} ${metricName} (${gapPercent}% יותר)`
          );
        }

        const topSum = rows.reduce((sum, row) => sum + row.men, 0);
        const topSumPercent = ((topSum / total) * 100).toFixed(1);

        const authoritiesText =
          rows.length >= 10 ? "10 הרשויות המובילות" : "הרשויות המובילות";
        const scopeText = clusterScopeLabel
          ? `ב${clusterScopeLabel}`
          : "באשכול";
        insights.push(
          `${authoritiesText} מכילות ${topSumPercent}% מכלל ה${metricName} ${scopeText}${statusSuffix}`
        );

        // Condition: If there are exactly 10 authorities (full top 10 list)
        // Provides: Size ratio showing how many times larger the 1st is compared to 10th for men
        if (rows.length === 10) {
          const lastAuthority = rows[rows.length - 1];
          const lastValue = lastAuthority.men;
          const ratioToFirst = (topValue / lastValue).toFixed(1);

          insights.push(
            `${topAuthority.name} גדולה פי ${ratioToFirst} מ-${lastAuthority.name} (הרשות העשירית)`
          );
        }
      }
    } else if (splitBy === "top_people") {
      // Condition: When viewing top 10 authorities by total population (men + women)
      // Provides: Same insights as top_women/men but for total population
      const rows = genderData.people.rows; // Top 10 authorities by total population
      total = genderData.people.totalPeople; // Total population in all authorities
      metricName = "תושבים"; // Update metric name to "residents" in Hebrew

      // Condition: If there is at least one authority in the results
      // Provides: Leading authority name, value, and percentage of total population
      if (rows.length > 0) {
        const topAuthority = rows[0];
        const topValue = topAuthority.people;
        const topPercent = ((topValue / total) * 100).toFixed(1);

        insights.push(
          `${topAuthority.name} מובילה עם ${topValue.toLocaleString(
            "he-IL"
          )} ${metricName} (${topPercent}%)`
        );

        // Condition: If there are at least 2 authorities in the results
        // Provides: Absolute and percentage gap between 1st and 2nd place for population
        if (rows.length > 1) {
          const secondAuthority = rows[1];
          const secondValue = secondAuthority.people;
          const gap = topValue - secondValue;
          const gapPercent = ((gap / secondValue) * 100).toFixed(1);

          insights.push(
            `הפער למקום השני (${secondAuthority.name}) הוא ${gap.toLocaleString(
              "he-IL"
            )} ${metricName} (${gapPercent}% יותר)`
          );
        }

        const topSum = rows.reduce((sum, row) => sum + row.people, 0);
        const topSumPercent = ((topSum / total) * 100).toFixed(1);

        const authoritiesText =
          rows.length >= 10 ? "10 הרשויות המובילות" : "הרשויות המובילות";
        const scopeText = clusterScopeLabel
          ? `ב${clusterScopeLabel}`
          : "באשכול";
        insights.push(
          `${authoritiesText} מכילות ${topSumPercent}% מכלל ה${metricName} ${scopeText}${statusSuffix}`
        );

        // Condition: If there are exactly 10 authorities (full top 10 list)
        // Provides: Size ratio showing how many times larger the 1st is compared to 10th for population
        if (rows.length === 10) {
          const lastAuthority = rows[rows.length - 1];
          const lastValue = lastAuthority.people;
          const ratioToFirst = (topValue / lastValue).toFixed(1);

          insights.push(
            `${topAuthority.name} גדולה פי ${ratioToFirst} מ-${lastAuthority.name} (הרשות העשירית)`
          );
        }
      }
    }
  }

  // Don't render the panel if no insights were generated
  if (insights.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4" dir="rtl">
      {/* Card header section */}
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          תובנות אוטומטיות
        </CardTitle>
      </CardHeader>

      {/* Card content section containing the insights list */}
      <CardContent>
        <ul className="space-y-2">
          {/* Map each insight to a list item with bullet point */}
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
