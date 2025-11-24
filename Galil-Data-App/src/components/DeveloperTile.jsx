import React from 'react';
import { Linkedin } from 'lucide-react';

const styles = {
  tile:
    "group fixed bottom-4 right-4 z-50 rounded-xl px-5 py-4 " +
    "shadow-lg overflow-hidden flex items-center gap-3 cursor-pointer " +
    "transition-all duration-300 ease-out hover:scale-[1.08] hover:shadow-l hover:shadow-[#1f2b3a]/50",

  // TRUE frosted glass — matte, soft, very transparent
  backdrop:
    "absolute inset-0 bg-white/7 dark:bg-white/5 " +
    "backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl",

  content: "relative z-10 flex items-center gap-3",

  textContainer: "flex flex-col",

  // Professional neutral palette
  line1: "text-xs text-gray-600 dark:text-gray-300",

  line2: "text-sm font-bold text-gray-500 dark:text-gray-100",

  logo:
    "w-8 h-8 text-gray-600 dark:text-gray-300 " +
    "transition-colors duration-300 group-hover:text-[#0072b1]"
};

export default function DeveloperTile({ name, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.tile} hidden md:flex`}  // 👈 Hides on mobile, shows on desktop
    >
      <div className={styles.backdrop} />

      <div className={styles.content}>
        <div className={styles.textContainer}>
          <div className={styles.line1}>Developed by</div>
          <div className={styles.line2}>{name}</div>
        </div>

        <Linkedin className={styles.logo} />
      </div>
    </a>
  );
}
