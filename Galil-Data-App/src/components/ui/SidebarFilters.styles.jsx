
import React from 'react';
import Dropdown from './Dropdown';

export const styles = {
  container: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-6 space-y-6",
  title: "text-lg font-bold text-center text-[#0F1F38] dark:text-white",
  filterWrapper: "space-y-2",
  label: "block text-sm font-medium text-gray-700 dark:text-white"
};

export default function SidebarFilters({ filters = [] }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        הפרמטרים שלכם
      </h3>
      {filters.map((filter, idx) => (
        <div key={idx} className={styles.filterWrapper}>
          <label className={styles.label}>
            {filter.label}
          </label>
          <Dropdown
            label={filter.placeholder || 'הכל'}
            options={filter.options}
            value={filter.value}
            onChange={filter.onChange}
          />
        </div>
      ))}
    </div>
  );
}
