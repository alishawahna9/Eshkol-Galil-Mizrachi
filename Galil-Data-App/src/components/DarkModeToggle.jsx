import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { styles } from './DarkModeToggle.styles';

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