import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import DarkModeToggle from './DarkModeToggle';

const styles = {
  nav: "bg-white dark:bg-[#0F1F38] shadow-md border-b border-gray-200 dark:border-gray-700",
  container: "max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4",
  wrapper: "flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0",
  leftSection: "w-full lg:w-auto",
  mobileTopRow: "flex items-center justify-between w-full lg:hidden mb-2",
  mobileNavRow: "flex items-center justify-center gap-2 sm:gap-4 w-full lg:hidden overflow-x-auto",
  desktopNav: "hidden lg:flex items-center gap-6",
  homeLink: "flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity",
  logo: "h-8 sm:h-10 w-auto",
  logoText: "hidden sm:block text-lg sm:text-2xl font-bold text-[#22A7D6]",
  navLink: "text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-[#22A7D6] dark:hover:text-[#6FD1F5] font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-lg",
  navLinkActive: "text-[#22A7D6] dark:text-[#6FD1F5] font-bold bg-[#22A7D6]/10 dark:bg-[#6FD1F5]/10",
  rightSection: "hidden lg:flex items-center gap-2 sm:gap-4 w-auto justify-end",
  heroLogo: "h-12 sm:h-16 w-auto",
  heroTextWrapper: "text-right",
  heroTitle: "text-base sm:text-xl font-bold text-[#0F1F38] dark:text-white",
  heroSubtitle: "text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium"
};

export default function TopNav({ darkMode, setDarkMode, currentPageName }) {
  const navItems = [
    { label: 'תחקור רשויות', page: 'MunicipalityMap' },
    { label: 'Data Explorer', page: 'DataExplorer' },
    { label: 'מדד איכות חיים', page: 'LifeQualityIndex' }
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftSection}>
            {/* Mobile: Top row with hero and toggle */}
            <div className={styles.mobileTopRow}>
              <div className="flex items-center gap-2">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/e6feb2597_EastGalilKnowlageLogo.png"
                  alt="East Galilee Knowledge Center Logo"
                  className="h-12 w-auto"
                />
                <div className="text-right">
                  <h2 className="text-sm font-bold text-[#0F1F38] dark:text-white">מרכז ידע אזורי גליל מזרחי</h2>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">REGIONAL KNOWLEDGE CENTER</p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">EAST GALILEE</p>
                </div>
              </div>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>

            {/* Mobile: Navigation tabs row */}
            <div className={styles.mobileNavRow}>
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`${styles.navLink} ${
                    currentPageName === item.page ? styles.navLinkActive : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop: Original layout */}
            <div className={styles.desktopNav}>
              <Link to={createPageUrl('Home')} className={styles.homeLink}>
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6913116075168739425b6058/6c3b79e72_logo.png" 
                  alt="Logo" 
                  className={styles.logo}
                />
                <div className={styles.logoText}>DATA - גליל</div>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`${styles.navLink} ${
                    currentPageName === item.page ? styles.navLinkActive : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>

        {/* Hero Section */}
          <div className={styles.rightSection}>
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/e6feb2597_EastGalilKnowlageLogo.png"
              alt="East Galilee Knowledge Center Logo"
              className={styles.heroLogo}
            />
            <div className={styles.heroTextWrapper}>
              <h2 className={styles.heroTitle}>מרכז ידע אזורי גליל מזרחי</h2>
              <p className={styles.heroSubtitle}>REGIONAL KNOWLEDGE CENTER</p>
              <p className={styles.heroSubtitle}>EAST GALILEE</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}