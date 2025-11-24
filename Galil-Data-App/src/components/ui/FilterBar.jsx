import React from 'react';
import Dropdown from './Dropdown';

export const styles = {
  container: "bg-white dark:bg-[#0F1F38] rounded-xl shadow-sm p-6 mb-6",
  wrapper: "flex items-center gap-4 flex-wrap",
  label: "text-sm font-medium text-gray-700 dark:text-white",
  grid: "flex-1 grid grid-cols-1 md:grid-cols-5 gap-4"
};

export default function FilterBar({ filters = [] }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.label}>הפרמטרים שלכם</span>
        <div className={styles.grid}>
          {filters.map((filter, idx) => (
            <Dropdown
              key={idx}
              label={filter.label}
              options={filter.options}
              value={filter.value}
              onChange={filter.onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}