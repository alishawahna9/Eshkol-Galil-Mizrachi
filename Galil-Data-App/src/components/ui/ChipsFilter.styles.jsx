
import React from 'react';

export const styles = {
  container: "flex flex-wrap gap-3",
  chip: "px-6 py-3 rounded-xl text-sm font-medium transition-all",
  chipActive: "bg-[#22A7D6] text-white shadow-lg shadow-[#22A7D6]/30",
  chipInactive: "bg-[#E7E9EC] dark:bg-[#1B4C8C] text-[#0F1F38] dark:text-white hover:bg-[#6FD1F5] hover:text-white"
};

export default function ChipsFilter({ items = [], activeItem, onSelect }) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`${styles.chip} ${
            activeItem === item
              ? styles.chipActive
              : styles.chipInactive
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
