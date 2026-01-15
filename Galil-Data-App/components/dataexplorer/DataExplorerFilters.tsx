import FilterDropdown from "@/components/FilterDropdown";
import { ValueKind } from "@/components/dataexplorer/dataexplorer-service";

type Option = { label: string; value: string };

type Props = {
  splitBy: string;
  municipalStatus: string;
  clusterScope: string;
  valueKind: ValueKind;
  splitOptions: Option[];
  statusOptions: Option[];
  scopeOptions: Option[];
  contentTypeOptions: Option[];
  onSplitByChange: (value: string) => void;
  onMunicipalStatusChange: (value: string) => void;
  onClusterScopeChange: (value: string) => void;
  onValueKindChange: (value: ValueKind) => void;
};

/**
 * DataExplorerFilters - Centralized filter controls for the Data Explorer screen.
 *
 * Displays 4 main filters:
 * 1. Metric selection (splitBy) - women/men/people
 * 2. Municipal status (municipalStatus) - city/local council/regional council
 * 3. Scope (clusterScope) - Galil Mizrachi cluster only or nationwide
 * 4. Value kind (valueKind) - absolute numbers or percentages
 *
 * Each filter change triggers the appropriate callback and updates the results.
 */
export default function DataExplorerFilters({
  splitBy,
  municipalStatus,
  clusterScope,
  valueKind,
  splitOptions,
  statusOptions,
  scopeOptions,
  contentTypeOptions,
  onSplitByChange,
  onMunicipalStatusChange,
  onClusterScopeChange,
  onValueKindChange,
}: Props) {
  return (
    <div
      className="
        w-full
        grid
        grid-cols-1
        gap-3
        items-end
        shrink-0
        sm:grid-cols-2
        md:flex
        md:items-end
        md:justify-start
        md:gap-3
      "
    >
      {/* Filter: choose how to split the data */}
      <FilterDropdown
        className="w-5/6 md:w-72"
        label="בחירת מדד"
        value={splitBy}
        onChange={onSplitByChange}
        options={splitOptions}
      />

      {/* Filter: municipal status (city / local council / regional council) */}
      <FilterDropdown
        className="w-full md:w-72"
        label="מעמד מוניציפלי"
        value={municipalStatus}
        onChange={onMunicipalStatusChange}
        options={statusOptions}
      />

      {/* Filter: cluster scope (cluster only / nationwide) */}
      <FilterDropdown
        className="w-full md:w-72"
        label="היקף"
        value={clusterScope}
        onChange={onClusterScopeChange}
        options={scopeOptions}
      />

      {/* Filter: choose value kind (number / percent) */}
      <FilterDropdown
        className="w-full md:w-72"
        label="סוג ערך"
        value={valueKind}
        onChange={(v) => onValueKindChange(v as ValueKind)}
        options={contentTypeOptions}
      />
    </div>
  );
}
