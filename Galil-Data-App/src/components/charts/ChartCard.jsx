import React from 'react';

export const styles = {
  card: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-6",
  header: "mb-6",
  title: "text-lg font-bold text-[#0F1F38] dark:text-white text-center mb-2",
  subtitle: "text-sm text-gray-600 dark:text-gray-300 text-center",
  content: "mb-4",
  actions: "flex justify-center gap-3 mt-6"
};

export default function ChartCard({ title, subtitle, children, actions }) {
  return (
    <div className={styles.card}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && (
            <h3 className={styles.title}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={styles.content}>
        {children}
      </div>

      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
}