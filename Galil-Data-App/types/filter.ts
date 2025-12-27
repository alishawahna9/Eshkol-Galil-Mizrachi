export type FilterItem = {
  label: string; // text before the dropdown
  options: string[];
  active: string[];
  placeholder?: string; // text inside dropdown when empty
  selectAll?: boolean; // enable/disable "select all" for this filter
};

export type Filters = Record<string, FilterItem>;
