
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Dropdown from '../components/ui/Dropdown';
import ChipsFilter from '../components/ui/ChipsFilter'; // This component is not used but kept as it was in the original file
import RealMap from '../components/map/RealMap';
import DataTable from '../components/table/DataTable';

export const styles = {
  page: "min-h-screen p-3 sm:p-4 md:p-6",
  container: "max-w-7xl mx-auto",
  headerSection: "mb-4 sm:mb-6",
  headerWrapper: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3",
  title: "text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1F38] dark:text-white mb-2",
  viewToggleWrapper: "flex gap-2 sm:gap-4",
  viewButton: "px-3 sm:px-4 md:px-6 py-2 rounded-lg text-sm sm:text-base font-medium",
  viewButtonActive: "bg-[#22A7D6] text-white",
  viewButtonInactive: "bg-gray-200 dark:bg-[#1B4C8C] text-gray-700 dark:text-gray-300",
  subtitle: "text-xs sm:text-sm text-gray-600 dark:text-gray-400",
  topFiltersWrapper: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6",
  topFiltersGrid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3",
  mainGrid: "flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6",
  sidebar: "lg:col-span-1 order-1",
  sidebarCard: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-4 sm:p-6",
  sidebarTitle: "text-base sm:text-lg font-bold text-center text-[#0F1F38] dark:text-white mb-4",
  sidebarSubtitle: "text-xs text-gray-600 dark:text-gray-400 mb-4 text-center",
  categoryGrid: "mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2",
  categoryButton: "px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all text-center lg:text-right",
  categoryButtonActive: "bg-[#22A7D6] text-white",
  categoryButtonInactive: "bg-gray-100 dark:bg-[#0F1F38] text-gray-700 dark:text-gray-300 hover:bg-[#6FD1F5] hover:text-white",
  addMetricsButton: "w-full px-3 sm:px-4 py-2 border-2 border-dashed border-[#22A7D6] text-[#22A7D6] rounded-lg text-xs sm:text-sm font-medium hover:bg-[#22A7D6] hover:text-white transition-colors mb-4",
  searchWrapper: "relative mb-3",
  searchIcon: "absolute right-3 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-gray-400",
  searchInput: "w-full pr-9 sm:pr-10 pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0F1F38] text-xs sm:text-sm",
  metricsList: "space-y-2 max-h-48 sm:max-h-64 overflow-y-auto",
  metricLabel: "flex items-start gap-2 cursor-pointer group",
  metricRadio: "mt-1",
  metricText: "text-xs text-gray-700 dark:text-gray-300 group-hover:text-[#22A7D6]",
  mapArea: "lg:col-span-4 order-2",
  mapCard: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-3 sm:p-4 md:p-6",
  mapTitle: "text-base sm:text-lg md:text-xl font-bold text-[#0F1F38] dark:text-white mb-3 sm:mb-4 text-center",
  mapSubtitle: "text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-center",
  mapGrid: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6",
  actionButtons: "flex flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6",
  actionButtonPrimary: "px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-[#22A7D6] text-white rounded-lg font-medium hover:bg-[#6FD1F5] transition-colors shadow-lg",
  actionButtonSecondary: "px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-white dark:bg-[#1B4C8C] text-[#0F1F38] dark:text-white border-2 border-[#22A7D6] rounded-lg font-medium hover:bg-[#22A7D6] hover:text-white transition-colors",
  actionButtonTertiary: "px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gray-100 dark:bg-[#0F1F38] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#22A7D6] transition-colors"
};

export default function MunicipalityMap() {
  const [activeView, setActiveView] = useState('מפה');
  const [selectedMetric, setSelectedMetric] = useState('אוכלוסייה');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  const categories = ['דמוגרפיה', 'בריאות חיים', 'חינוך', 'כלכלה והשכלה', 'רווחה', 'תשתיות'];
  const [activeCategory, setActiveCategory] = useState('דמוגרפיה');

  const metrics = [
    'ציפוייה אובלוטיסית לאומינה',
    'אוכלוסייה',
    'אוכלוסייה - רוחבידם וסערצכים',
    'אוכלוסייה - עברינים',
    'אוכלוסייה - מוסלמים',
    'אוכלוסייה - דרוזים'
  ];

  const topFilters = [
    { label: 'שנה', value: '2022', options: ['2017', '2018', '2019', '2020', '2021', '2022'], onChange: () => {} },
    { label: 'סוג ערך', value: 'מספרי', options: ['מספרי', 'אחוזי'], onChange: () => {} },
    { label: 'סוג השוואה', value: 'בחר', options: ['בחר'], onChange: () => {} },
    { label: 'ללא נקודת השוואה', value: 'בחר', options: ['בחר'], onChange: () => {} },
    { label: 'נקודת השוואה', value: 'בחר', options: ['בחר'], onChange: () => {} },
    { label: 'ארצי', value: 'בחר', options: ['בחר'], onChange: () => {} }
  ];

  // Helper function to get color based on population
  const getColorByPopulation = (value) => {
    const pop = parseInt(value.replace(/,/g, ''));
    if (pop > 30000) return '#1B4C8C'; // Dark blue
    if (pop > 20000) return '#22A7D6'; // Turquoise
    if (pop > 15000) return '#6FD1F5'; // Light turquoise
    if (pop > 10000) return '#8CD43A'; // Lime green
    if (pop > 7000) return '#BED43A';  // Yellow-green
    if (pop > 5000) return '#E8D43A';  // Yellow
    if (pop > 3000) return '#F5B041';  // Orange
    return '#F8C471'; // Light orange
  };

  const municipalityData = [
    { name: 'צפת', value: '39,179' },
    { name: 'קרית שמונה', value: '24,254' },
    { name: 'גולן', value: '21,484' },
    { name: 'הגליל העליון', value: '20,881' },
    { name: 'מרום הגליל', value: '16,846' },
    { name: 'מגדל שמס', value: '11,235' },
    { name: 'חצור הגלילית', value: '11,061' },
    { name: 'מבואות החרמון', value: '8,827' },
    { name: 'קצרין', value: '8,043' },
    { name: 'טובא - זנגרייה', value: '7,109' },
    { name: 'בוקעאתא', value: '6,835' },
    { name: 'מסעדה', value: '4,161' },
    { name: 'ראש פינה', value: '3,376' },
    { name: 'גוש חלב (גיש)', value: '3,233' },
    { name: "ע'ג'ר", value: '2,699' },
    { name: 'עין קיניה', value: '2,438' },
    { name: 'מטולה', value: '2,152' },
    { name: 'יסוד המעלה', value: '1,965' }
  ].map(item => ({
    ...item,
    color: getColorByPopulation(item.value)
  }));

  const tableColumns = [
    { key: 'name', label: 'שם הרשות' },
    { key: 'value', label: 'ערך', numeric: true, align: 'center' }
  ];

  const filteredMetrics = metrics.filter(m => m.includes(searchQuery));

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.headerWrapper}>
            <div>
              <h1 className={styles.title}>
                בחירת רשויות
              </h1>
              <div className={styles.viewToggleWrapper}>
                <button
                  onClick={() => setActiveView('מפה')}
                  className={`${styles.viewButton} ${
                    activeView === 'מפה' ? styles.viewButtonActive : styles.viewButtonInactive
                  }`}
                >
                  בחירת מפה
                </button>
                <button
                  onClick={() => setActiveView('רשימה')}
                  className={`${styles.viewButton} ${
                    activeView === 'רשימה' ? styles.viewButtonActive : styles.viewButtonInactive
                  }`}
                >
                  בחירת רשימות
                </button>
              </div>
            </div>
            <div className={styles.subtitle}>
              פילוח רשויות המקומיות
            </div>
          </div>

          {/* Top Filters */}
          <div className={styles.topFiltersWrapper}>
            <div className={styles.topFiltersGrid}>
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
        </div>

        {/* Main Content */}
        <div className={styles.mainGrid}>
          {/* Right Sidebar - Metric Selection */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                בחירת מדד לתחקור
              </h3>

              <p className={styles.sidebarSubtitle}>
                מגצאום סן-בוטזו 394 מדדים
              </p>

              {/* Category Buttons */}
              <div className={styles.categoryGrid}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`${styles.categoryButton} ${
                      activeCategory === cat
                        ? styles.categoryButtonActive
                        : styles.categoryButtonInactive
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Add Metrics Button */}
              <button className={styles.addMetricsButton}>
                + הוספת מדדים
              </button>

              {/* Search */}
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="חיפוש"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Metrics List */}
              <div className={styles.metricsList}>
                {filteredMetrics.map((metric) => (
                  <label key={metric} className={styles.metricLabel}>
                    <input
                      type="radio"
                      name="metric"
                      checked={selectedMetric === metric}
                      onChange={() => setSelectedMetric(metric)}
                      className={styles.metricRadio}
                    />
                    <span className={styles.metricText}>
                      {metric}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Map/Table Area */}
          <div className={styles.mapArea}>
            {activeView === 'מפה' ? (
              <div className={styles.mapCard}>
                <h2 className={styles.mapTitle}>
                  מפת הרשויות המקומיות של אוכלוסייה (אנשים) בעשנת 2023
                </h2>
                <p className={styles.mapSubtitle}>
                  ערכי רשויות מקומיות, שלום, שלוש
                </p>
                <div className={styles.mapGrid}>
                  <RealMap selectedMunicipality={selectedMunicipality} />
                  <div>
                    <DataTable 
                      data={municipalityData} 
                      columns={tableColumns}
                      onRowClick={(row) => setSelectedMunicipality(row.name)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                  <button className={styles.actionButtonPrimary}>
                    מפות
                  </button>
                  <button className={styles.actionButtonSecondary}>
                    מבזור אזורהז
                  </button>
                  <button className={styles.actionButtonSecondary}>
                    עיצוב להורדה
                  </button>
                  <button className={styles.actionButtonTertiary}>
                    מפזטר
                  </button>
                </div>
              </div>
            ) : (
              <DataTable data={municipalityData} columns={tableColumns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
