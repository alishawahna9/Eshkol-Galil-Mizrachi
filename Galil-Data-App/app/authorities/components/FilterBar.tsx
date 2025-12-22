export type FilterOption = {
  value: string;
  label: string;
};

export type Filter = {
  id: string;
  label: string;
  options: FilterOption[];
  disabled?: boolean;
};


type Props = {
  filters: Filter[];
};

export default function FilterBar({ filters }: Props) {
  return (
    <div
      dir="rtl"
      className="flex items-center gap-4 border-b border-slate-200 px-4 py-3"
    >
      {filters.map((filter, index) => (
        <div key={filter.id} className="flex items-center gap-4">
          
          <select
            disabled={filter.disabled}
            className={`
              rounded-md border px-3 py-2 text-sm
              ${
                filter.disabled
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-white text-slate-900"
              }
            `}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {index !== filters.length - 1 && (
            <div className="h-6 w-px bg-slate-300" />
          )}
        </div>
      ))}
    </div>
  );
}

