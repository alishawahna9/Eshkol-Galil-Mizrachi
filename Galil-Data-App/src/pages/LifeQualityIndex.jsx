import React, { useState } from 'react';
import ChipsFilter from '../components/ui/ChipsFilter';
import FilterBar from '../components/ui/FilterBar';
import SidebarFilters from '../components/ui/SidebarFilters';
import ChartCard from '../components/charts/ChartCard';
import BarChart from '../components/charts/BarChart';

export default function LifeQualityIndex() {
  const [activeTab, setActiveTab] = useState('תחקור');
  const [activeCategory, setActiveCategory] = useState('איכות חיים');

  const categories = [
    'איכות חיים',
    'בנייה ודיור',
    'בריאות',
    'דמוגרפיה',
    'השכלה וחינוך',
    'כלכלה ותעסוקה',
    'תשתיות'
  ];

  const topFiltersExplore = [
    { 
      label: 'בחירת תחום', 
      value: 'בחר', 
      options: ['בחר', 'איכות הדיור והתשתיות', 'חינוך', 'מוסדות להשכלה גבוהה', 'רווחה אישית וחברתית', 'שירותי הבריאות', 'שירותים', 'תחבורה', 'בריאות', 'תעסוקה'], 
      onChange: () => {} 
    },
    { label: 'בחירת שאלה', value: 'בחר', options: ['בחר'], onChange: () => {} },
    { 
      label: 'בחירת פילוח', 
      value: 'בחר', 
      options: ['בחר', 'קבוצת גיל', 'מגדר', 'קבוצת אוכלוסיה', 'מידת דתיות', 'השכלה', 'מצב משפחתי', 'אשכול חברתי-כלכלי', 'מקצוע', 'הכל - ללא פילוח'], 
      onChange: () => {} 
    },
    { label: 'קבוצת גיל', value: 'בחר הכל', options: ['בחר הכל', '18-39', '40-61', '62-83'], onChange: () => {} },
    { label: 'מגדר', value: 'בחר הכל', options: ['בחר הכל', 'גבר', 'אישה'], onChange: () => {} }
  ];

  const topFiltersCompare = [
    { label: 'מגדר', value: 'בחר הכל', options: ['בחר הכל', 'גבר', 'אישה'], onChange: () => {} },
    { label: 'קבוצת גיל', value: 'בחר הכל', options: ['בחר הכל', '18-39', '40-61', '62-83'], onChange: () => {} },
    { label: 'מידת דתיות', value: 'בחר הכל', options: ['בחר הכל', 'חילוני', 'מסורתי', 'דתי', 'חרדי'], onChange: () => {} },
    { label: 'קבוצת אוכלוסיה', value: 'בחר הכל', options: ['בחר הכל', 'יהודים', 'ערבים ואחרים'], onChange: () => {} }
  ];

  const topFiltersSpotlight = [
    { label: 'מגדר', value: 'בחר הכל', options: ['בחר הכל', 'גבר', 'אישה'], onChange: () => {} },
    { label: 'קבוצת גיל', value: 'בחר הכל', options: ['בחר הכל', '18-39', '40-61', '62-83'], onChange: () => {} },
    { label: 'מידת דתיות', value: 'בחר הכל', options: ['בחר הכל', 'חילוני', 'מסורתי', 'דתי', 'חרדי'], onChange: () => {} },
    { label: 'קבוצת אוכלוסיה', value: 'בחר הכל', options: ['בחר הכל', 'יהודים', 'ערבים ואחרים'], onChange: () => {} }
  ];

  const sidebarFilters = [
    { label: 'מגדר', placeholder: 'בחר הכל', options: ['בחר הכל', 'גבר', 'אישה'], onChange: () => {} },
    { label: 'קבוצת גיל', placeholder: 'בחר הכל', options: ['בחר הכל', '18-39', '40-61', '62-83'], onChange: () => {} },
    { label: 'מידת דתיות', placeholder: 'בחר הכל', options: ['בחר הכל', 'חילוני', 'מסורתי', 'דתי', 'חרדי'], onChange: () => {} },
    { label: 'קבוצת אוכלוסיה', placeholder: 'בחר הכל', options: ['בחר הכל', 'יהודים', 'ערבים ואחרים'], onChange: () => {} },
    { label: 'השכלה', placeholder: 'בחר הכל', options: ['בחר הכל', 'יסודי', 'תיכון', 'אקדמית'], onChange: () => {} },
    { label: 'אשכול חברתי-כלכלי', placeholder: 'בחר הכל', options: ['בחר הכל', '1-3', '4-7', '8-10'], onChange: () => {} }
  ];

  // Data for "תחקור" tab
  const exploreChartData = [
    { label: '18–39', value: 6 },
    { label: '40–61', value: 13 },
    { label: '62–83', value: 20 }
  ];

  // Data for "השוואה לסקר חברתי" tab
  const compareChart1Data = [
    { label: 'רוצים ש-יש ש-יש על הכדעת בעת השעה', value: 76 },
    { label: 'הידיעת הצורפת בזדרק', value: 21 }
  ];

  const compareChart2Data = [
    { label: 'נתונים אישגולי הבנסטגלקח', value: 58 },
    { label: 'מנידים שמסתביו ברל-אולת', value: 64 }
  ];

  const compareChart3Data = [
    { label: 'ניצומים מצטעום', value: 61 },
    { label: 'מזיגומ שבדוזב-אולת נוסגבדי הגולולת', value: 52 },
    { label: 'לכניגומ-ממנטתספווררם המתעדרכ', value: 37 },
    { label: 'מיבדע', value: 34 }
  ];

  // Data for "זרקור" tab
  const spotlightChartData = [
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
            {activeTab === 'זרקור' 
              ? 'מדד איכות חיים - אשכול גליל מזרחי - קיץ 2023'
              : 'מדד איכות חיים - אשכול גליל מזרחי'
            }
          </h1>
          
          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {['תחקור', 'השוואה לסקר חברתי', 'זרקור'].map((tab) => (
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

        {/* Tab Content: תחקור */}
        {activeTab === 'תחקור' && (
          <>
            {/* Category Chips */}
            <div className="mb-6">
              <ChipsFilter
                items={categories}
                activeItem={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>

            {/* Top Filter Bar */}
            <FilterBar filters={topFiltersExplore} />

            {/* Main Content with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <ChartCard
                  title='במילא לפי קבוצת גיל, (%-CT) גבול גיל טבקאל או בין בתקאלות שבדר האנשים המתמקדים עם הנדג - "קומפס של שטרות הפאסה באזור'
                  subtitle="קבוצת גיל"
                >
                  <BarChart data={exploreChartData} />
                </ChartCard>
              </div>

              {/* Sidebar Filters */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <SidebarFilters filters={sidebarFilters} />
              </div>
            </div>
          </>
        )}

        {/* Tab Content: השוואה לסקר חברתי */}
        {activeTab === 'השוואה לסקר חברתי' && (
          <>
            {/* Top Filter Bar */}
            <FilterBar filters={topFiltersCompare} />

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
                <BarChart data={compareChart1Data} maxValue={100} />
              </ChartCard>

              <ChartCard title="שירותי בריאות">
                <BarChart data={compareChart2Data} maxValue={100} />
              </ChartCard>

              <ChartCard title="תוויות אישיות והדמתות">
                <BarChart data={compareChart3Data} maxValue={100} />
              </ChartCard>
            </div>
          </>
        )}

        {/* Tab Content: זרקור */}
        {activeTab === 'זרקור' && (
          <>
            {/* Top Filter Bar */}
            <FilterBar filters={topFiltersSpotlight} />

            {/* Main Chart */}
            <ChartCard title="מדד איכות חיים לפי תחום">
              <BarChart data={spotlightChartData} maxValue={60} />
            </ChartCard>
          </>
        )}
      </div>
    </div>
  );
}