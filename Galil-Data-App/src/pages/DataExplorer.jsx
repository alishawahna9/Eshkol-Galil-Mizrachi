import React, { useState } from 'react';
import { Search, BarChart3, Table2, FileText } from 'lucide-react';
import Dropdown from '../components/ui/Dropdown';
import ChipsFilter from '../components/ui/ChipsFilter';
import ChartCard from '../components/charts/ChartCard';
import BarChart from '../components/charts/BarChart';

export default function DataExplorer() {
  const [selectedMetric, setSelectedMetric] = useState('מי אשטיל חסרת העדדקה');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['איכות חיים', 'בריאות חיים', 'בריאות', 'דמוגרפיה', 'כלכלה ותעסוקה', 'חינוך והשכלה'];
  const [activeCategory, setActiveCategory] = useState('בריאות');

  const metrics = [
    'אימטננות נגיכם לחלשטסית רדניקה',
    'אנבחבר הידודסת הדרד',
    'אשכול ביישמנים חד-נק סזסבטליבדי',
    'אשאים שמגטקים לבשרס מטתבות',
    'דיהל חמפטר לתמטכח התיזשרס',
    'מי אשטיל חסרת העדדקה'
  ];

  const topFilters = [
    { 
      label: 'שנה', 
      value: '2022', 
      options: ['2017', '2018', '2019', '2020', '2021', '2022'], 
      onChange: () => {} 
    },
    { 
      label: 'סוג ערך', 
      value: 'אחוזי', 
      options: ['מספרי', 'אחוזי'], 
      onChange: () => {} 
    },
    { 
      label: 'פילוח ראשי', 
      value: 'בחר', 
      options: ['בחר', 'אשכול גליל מזרחי', 'גיל', 'דת', 'הכנסה נטו', 'חוזרים בתשובה', 'יליד ברה"מ', 'מגדר', 'מחוז', 'מספר נפשות במשק הבית', 'מצב בריאותי', 'מצב משפחתי', 'משלח יד', 'ענף כלכלי', 'קבוצת אוכלוסייה', 'רמת דתיות - יהודים', 'רמת דתיות - לא יהודים', 'רמת השכלה', 'תעודה גבוהה- אם'], 
      onChange: () => {} 
    },
    { 
      label: 'פילוח משני', 
      value: 'בחר', 
      options: ['בחר'], 
      onChange: () => {} 
    }
  ];

  const chartData = [
    { label: 'נכוגון (נמנטאט אוחת ביתומז)', value: 51 },
    { label: 'בינוניים (בקפס אידה סבאסטי למיפוח רגילטות הגולאות כסלחלת גיאנאי', value: 42 },
    { label: 'טובורח (נטס רועח ורניחי בינוזד)', value: 6.9 }
  ];

  const filteredMetrics = metrics.filter(m => m.includes(searchQuery));

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1F38] dark:text-white">
              הפרמטר בחרות מדד
            </h1>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              ניתן לטיזין בין מדדים שונים במערכת
            </div>
          </div>

          {/* View Toggle Icons */}
          <div className="flex gap-2 mb-4 sm:mb-6">
            <button className="p-2 rounded bg-[#22A7D6] text-white">
              <BarChart3 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded bg-gray-200 dark:bg-[#1B4C8C] text-gray-600 dark:text-gray-300">
              <Table2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded bg-gray-200 dark:bg-[#1B4C8C] text-gray-600 dark:text-gray-300">
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Top Filters */}
            <div className="bg-white dark:bg-[#1B4C8C] rounded-xl shadow-sm p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {topFilters.map((filter, idx) => (
                  <Dropdown
                    key={idx}
                    label={filter.label}
                    value={filter.value}
                    options={filter.options}
                    onChange={filter.onChange}
                  />
                ))}
              </div>
            </div>

            {/* Chart */}
            <ChartCard
              title="ציטחונות - מספור אנשים לבורד בדירה (ממוצעים) בעניזה 2022 באשכול גליל מזרחי, בפילוח לפי גלילות האטמ"
              subtitle="וטקס (שייטושת, שלוש)"
            >
              <BarChart data={chartData} maxValue={60} />
            </ChartCard>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-[#22A7D6] text-white rounded-lg font-medium hover:bg-[#6FD1F5] transition-colors shadow-lg">
                תרשים
              </button>
              <button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-white dark:bg-[#1B4C8C] text-[#0F1F38] dark:text-white border-2 border-[#22A7D6] rounded-lg font-medium hover:bg-[#22A7D6] hover:text-white transition-colors">
                טבלה והורדה
              </button>
              <button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gray-100 dark:bg-[#0F1F38] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#22A7D6] transition-colors">
                הסבר על המדד
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-center text-[#0F1F38] dark:text-white mb-4">
                פילוח תחום חיים
              </h3>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                <button className="flex-1 px-3 py-2 bg-gray-100 dark:bg-[#0F1F38] rounded-lg text-sm font-medium">
                  סינון תחום
                </button>
                <button className="flex-1 px-3 py-2 bg-[#22A7D6] text-white rounded-lg text-sm font-medium">
                  בחירת מדד
                </button>
              </div>

              {/* Category Chips */}
              <div className="mb-4 space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all text-right ${
                      activeCategory === cat
                        ? 'bg-[#22A7D6] text-white'
                        : 'bg-gray-100 dark:bg-[#0F1F38] text-gray-700 dark:text-gray-300 hover:bg-[#6FD1F5] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Add Metrics Button */}
              <button className="w-full px-4 py-2 border-2 border-dashed border-[#22A7D6] text-[#22A7D6] rounded-lg text-sm font-medium hover:bg-[#22A7D6] hover:text-white transition-colors mb-6">
                + הוספת מדדים
              </button>

              {/* Metrics Selection */}
              <div>
                <h4 className="font-bold text-[#0F1F38] dark:text-white mb-4">בחירת מדד</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  נמצעאו סן-בכ-זאו 640 מדדים
                </p>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="חיפוש"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0F1F38] text-sm"
                  />
                </div>

                {/* Metrics List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredMetrics.map((metric) => (
                    <label key={metric} className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="metric"
                        checked={selectedMetric === metric}
                        onChange={() => setSelectedMetric(metric)}
                        className="mt-1"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-[#22A7D6]">
                        {metric}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}