
import React from 'react';
import { Moon, Sun } from 'lucide-react';

export const styles = {
  container: "relative inline-block w-12 h-7 cursor-pointer",
  input: "peer sr-only",
  track: "flex items-center justify-center absolute inset-0 bg-[#58c9ef] rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 dark:bg-[#1B4C8C] dark:peer-checked:bg-[#1B4C8C] peer-disabled:opacity-50 peer-disabled:pointer-events-none",
  thumb: "flex items-center justify-center absolute top-1/2 end-1 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm !transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white",
  moonIcon: "w-3 h-3 text-[#1B4C8C]",
  sunIcon: "w-3 h-3 text-[#22A7D6]"
};

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <label htmlFor="darkSwitch" className={styles.container}>
      <input
        type="checkbox"
        id="darkSwitch"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
        className={styles.input}
      />
      <span className={styles.track}></span>
      <span className={styles.thumb}>
        {darkMode ? (
          <Moon className={styles.moonIcon} />
        ) : (
          <Sun className={styles.sunIcon} />
        )}
      </span>
    </label>
  );
}
