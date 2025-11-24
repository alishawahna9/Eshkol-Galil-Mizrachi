
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const styles = {
  container: "relative",
  button: "w-full flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-white dark:bg-[#1B4C8C] border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm text-gray-700 dark:text-white hover:border-[#22A7D6] transition-colors",
  buttonText: "truncate",
  chevron: "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transition-transform",
  chevronOpen: "rotate-180",
  overlay: "fixed inset-0 z-10",
  dropdown: "absolute left-0 right-0 mt-2 bg-white dark:bg-[#1B4C8C] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 max-h-48 sm:max-h-60 overflow-y-auto",
  option: "w-full text-right px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-white hover:bg-[#22A7D6] hover:text-white transition-colors"
};

export default function Dropdown({ label, options = [], value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.button} ${className}`}
      >
        <span className={styles.buttonText}>{value || label}</span>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className={styles.overlay} 
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.dropdown}>
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange?.(option);
                  setIsOpen(false);
                }}
                className={styles.option}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
