import React, { useState } from 'react';
import ChipsFilter from '../components/ui/ChipsFilter';
import FilterBar from '../components/ui/FilterBar';
import SidebarFilters from '../components/ui/SidebarFilters';
import ChartCard from '../components/charts/ChartCard';
import BarChart from '../components/charts/BarChart';

export default function LifeQualityExplore() {
  const [activeCategory, setActiveCategory] = useState('איכות חיים');
  const [activeTab, setActiveTab] = useState('תחקור');

  const categories = [
    'איכות חיים',
    'בנייה ודיור',
    'בריאות',
    'דמוגרפיה',
    'השכלה וחינוך',
    'כלכלה ותעסוקה',
    'תשתיות'
  ];

  const topFilters = [
    { label: 'בחירת תחום', value: 'קורא ה-כל', options: ['קורא ה-כל', 'בריאות', 'חינוך'], onChange: () => {} },
    { label: 'בחירת שאלה', value: 'הכל', options: ['הכל', 'שאלה 1', 'שאלה 2'], onChange: () => {} },
    { label: 'בחירת פילוח', value: 'קבוצת גיל', options: ['קבוצת גיל', 'מגדר', 'דתיות'], onChange: () => {} },
    { label: 'קבוצת גיל', value: 'הכל', options: ['הכל', '18-39', '40-61', '62-83'], onChange: () => {} },
    { label: 'רוויחת תחומה', value: 'הכל', options: ['הכל', 'זכוי', 'נדקבות'], onChange: () => {} }
  ];

  const sidebarFilters = [
    { label: 'מגדר', placeholder: 'הכל', options: ['הכל', 'זכר', 'נקבה'], onChange: () => {} },
    { label: 'קבוצת גיל', placeholder: 'הכל', options: ['הכל', '18-39', '40-61', '62-83'], onChange: () => {} },
    { label: 'מידת דתיות', placeholder: 'הכל', options: ['הכל', 'חילוני', 'מסורתי', 'דתי', 'חרדי'], onChange: () => {} },
    { label: 'קבוצת אוכלוסייה', placeholder: 'הכל', options: ['הכל', 'יהודים', 'ערבים'], onChange: () => {} },
    { label: 'השכלה', placeholder: 'הכל', options: ['הכל', 'יסודי', 'תיכון', 'אקדמית'], onChange: () => {} },
    { label: 'אשכול חברתי-כלכלי', placeholder: 'הכל', options: ['הכל', '1-3', '4-7', '8-10'], onChange: () => {} }
  ];

  const chartData = [
    { label: '18–39', value: 6 },
    { label: '40–61', value: 13 },
    { label: '62–83', value: 20 }
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
          <div className="flex gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {['תחקור', 'השוואה לסקר הגרמי', 'זרקור'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-[#22A7D6] border-b-2 border-[#22A7D6]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#22A7D6]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Chips */}
        <div className="mb-6">
          <ChipsFilter
            items={categories}
            activeItem={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Top Filter Bar */}
        <FilterBar filters={topFilters} />

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <ChartCard
              title='במילא לפי קבוצת גיל, (%-CT) גבול גיל טבקאל או בין בתקאלות שבדר האנשים המתמקדים עם הנדג - "קומפס של שטרות הפאסה באזור'
              subtitle="קבוצת גיל"
            >
              <BarChart data={chartData} />
            </ChartCard>
          </div>

          {/* Sidebar Filters */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <SidebarFilters filters={sidebarFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}