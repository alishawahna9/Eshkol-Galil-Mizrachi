import React, { ReactNode } from 'react';
import { ChartCardProps } from '../../utils/interface';
import { CHART_CARD_STYLES } from './chart.config';

/**
 * ChartCard Component
 * Wrapper component for chart displays with title, subtitle, and optional actions
 *
 * @example
 * ```tsx
 * <ChartCard
 *   title="Sales Overview"
 *   subtitle="Q4 2025"
 *   actions={<button>Download</button>}
 * >
 *   <BarChart data={data} />
 * </ChartCard>
 * ```
 */
const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  actions,
}) => {
  const hasHeader = Boolean(title || subtitle);

  return (
    <div className={CHART_CARD_STYLES.card}>
      {hasHeader && (
        <div className={CHART_CARD_STYLES.header}>
          {title && (
            <h3 className={CHART_CARD_STYLES.title}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={CHART_CARD_STYLES.subtitle}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={CHART_CARD_STYLES.content}>
        {children}
      </div>

      {actions && (
        <div className={CHART_CARD_STYLES.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default React.memo(ChartCard);
