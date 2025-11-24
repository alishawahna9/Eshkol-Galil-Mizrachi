import React from 'react';
import FilterBar from '../components/ui/FilterBar';
import ChartCard from '../components/charts/ChartCard';
import BarChart from '../components/charts/BarChart';

export default function Spotlight() {
  const topFilters = [
    { label: 'מגדר', value: 'הכל', options: ['הכל', 'זכר', 'נקבה'], onChange: () => {} },
    { label: 'קבוצת גיל', value: 'הכל', options: ['הכל', '18-39', '40-61'], onChange: () => {} },
    { label: 'מידת דתיות', value: 'הכל', options: ['הכל', 'חילוני', 'דתי'], onChange: () => {} },
    { label: 'קבוצת אוכלוסייה', value: 'הכל', options: ['הכל', 'יהודים', 'ערבים'], onChange: () => {} },
    { label: 'קבוצת גיל או לאומיות', value: 'הכל', options: ['הכל'], onChange: () => {} }
  ];

  const chartData = [
    { label: 'רווחה אישית וחברתית', value: 56 },
    { label: 'שירותים', value: 46 },
    { label: 'שירותי בריאות', value: 42 },
    { label: 'תעסוקה', value: 41 },
    { label: 'תרבות, פנאי וספורט', value: 36 },
    { label: 'שירותי דת-לגולסה, נוצוכ-גרולת', value: 31 },
    { label: 'חינוך', value: 25 },
    { label: 'ביטחון והתאחסלמות', value: 20 },
    { label: 'דיור ובניחה', value: 16 }
  ];

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1F38] dark:text-white mb-4">
            מדד איכות חיים - אשכול גליל מזרחי - קיץ 2023
          </h1>
          
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <button className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">
              תחקור
            </button>
            <button className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">
              השוואה לסקר הגרמי
            </button>
            <button className="px-6 py-3 font-medium text-[#22A7D6] border-b-2 border-[#22A7D6]">
              זרקור
            </button>
          </div>
        </div>

        {/* Top Filter Bar */}
        <FilterBar filters={topFilters} />

        {/* Main Chart */}
        <ChartCard title="מדד איכות חיים לפי תחום">
          <BarChart data={chartData} maxValue={60} />
        </ChartCard>
      </div>
    </div>
  );
}