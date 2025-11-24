import React from 'react';
import FilterBar from '../components/ui/FilterBar';
import ChartCard from '../components/charts/ChartCard';
import BarChart from '../components/charts/BarChart';

export default function SocialSurveyCompare() {
  const topFilters = [
    { label: 'מגדר', value: 'הכל', options: ['הכל', 'זכר', 'נקבה'], onChange: () => {} },
    { label: 'קבוצת גיל או לאומיות', value: 'הכל', options: ['הכל', '18-39', '40-61'], onChange: () => {} },
    { label: 'מידת דתיות', value: 'הכל', options: ['הכל', 'חילוני', 'דתי'], onChange: () => {} },
    { label: 'הכל', value: 'הכל', options: ['הכל'], onChange: () => {} }
  ];

  const chart1Data = [
    { label: 'רוצים ש-יש ש-יש על הכדעת בעת השעה', value: 76 },
    { label: 'הידיעת הצורפת בזדרק', value: 21 }
  ];

  const chart2Data = [
    { label: 'נתונים אישגולי הבנסטגלקח', value: 58 },
    { label: 'מנידים שמסתביו ברל-אולת', value: 64 }
  ];

  const chart3Data = [
    { label: 'ניצומים מצטעום', value: 61 },
    { label: 'מזיגומ שבדוזב-אולת נוסגבדי הגולולת', value: 52 },
    { label: 'לכניגומ-ממנטתספווררם המתעדרכ', value: 37 },
    { label: 'מיבדע', value: 34 }
  ];

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1F38] dark:text-white mb-4">
            מדד איכות חיים - אשכול גליל מזרחי
          </h1>
          
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <button className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">
              תחקור
            </button>
            <button className="px-6 py-3 font-medium text-[#22A7D6] border-b-2 border-[#22A7D6]">
              השוואה לסקר הגרמי
            </button>
            <button className="px-6 py-3 font-medium text-gray-600 dark:text-gray-400">
              זרקור
            </button>
          </div>
        </div>

        {/* Top Filter Bar */}
        <FilterBar filters={topFilters} />

        {/* Title */}
        <div className="bg-white dark:bg-[#1B4C8C] rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-center text-[#0F1F38] dark:text-white mb-2">
            השוואה מדד איכות החיים לסקר החבדהי של גומ"ס לשנת 2022
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#6FD1F5] rounded" />
              <span className="text-gray-600 dark:text-gray-300">במלאזי - סקר הגומזי של גומ"ס</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#0F1F38] dark:bg-[#22A7D6] rounded" />
              <span className="text-gray-600 dark:text-gray-300">אשכול גליל מזרחי - מדד איכות חיים</span>
            </div>
          </div>
        </div>

        {/* Three Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <ChartCard title="תעסוקה">
            <BarChart data={chart1Data} maxValue={100} />
          </ChartCard>

          <ChartCard title="שירותי בריאות">
            <BarChart data={chart2Data} maxValue={100} />
          </ChartCard>

          <ChartCard title="תוויות אישיות והדמתות">
            <BarChart data={chart3Data} maxValue={100} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}