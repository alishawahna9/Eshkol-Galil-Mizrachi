import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import DeveloperTile from '../components/DeveloperTile';

const styles = {
  page: "min-h-screen relative overflow-x-hidden",
  hero: "relative min-h-screen flex items-center justify-center overflow-hidden py-4 sm:py-8",
  backgroundImage: "absolute inset-0 z-0",
  image: "w-full h-full object-cover",
  gradient: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60",
  content: "relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 w-full",
  card: "bg-white/95 dark:bg-[#0F1F38]/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-6 md:p-8 lg:p-12",
  header: "flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700",
  logo: "h-12 sm:h-16 md:h-20 lg:h-28 w-auto flex-shrink-0",
  headerText: "text-right flex-1 min-w-0",
  title: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#0F1F38] dark:text-white mb-0.5 leading-tight",
  subtitle: "text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium",
  subtitle2: "text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium",
  pageTitle: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#22A7D6] mb-4 sm:mb-6 md:mb-8 leading-tight",
  description: "text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base lg:text-lg",
  button: "w-full bg-gradient-to-r from-[#22A7D6] to-[#1B4C8C] text-white py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg md:text-xl font-bold hover:from-[#1B4C8C] hover:to-[#22A7D6] transition-all duration-300 shadow-lg hover:shadow-2xl",
  partnersSection: "mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700",
  partnersTitle: "text-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 md:mb-6 font-medium",
  partnersGrid: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-center justify-items-center",
  partnerLogo: "h-10 sm:h-12 md:h-16 w-full max-w-[80px] sm:max-w-[120px] md:max-w-[150px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
};

export default function Home() {
  return (
    <div className={styles.page} dir="rtl">
      {/* Background Image - Full Page */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Nature Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Hero Section */}
      <div className={styles.hero}>

        <div className={styles.content}>
          <div className={styles.card}>
              <div className={styles.header}>
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/e6feb2597_EastGalilKnowlageLogo.png"
                  alt="East Galilee Knowledge Center Logo"
                  className={styles.logo}
                />
                <div className={styles.headerText}>
                  <h2 className={styles.title}>מרכז ידע אזורי גליל מזרחי</h2>
                  <p className={styles.subtitle}>REGIONAL KNOWLEDGE CENTER</p>
                  <p className={styles.subtitle2}>EAST GALILEE</p>
                </div>
              </div>

              <h1 className={styles.pageTitle}>
                מערכת DATA - גליל
              </h1>

              <div className={styles.description}>
              <p>
                ברוכים הבאים למערכת הנתונים של מרכז הידע האזורי- גליל מזרחי
              </p>
              <p>
                מטרת המערכת היא להציג ידע ונתונים אודות אזור הגליל המזרחי, לצפות בנתונים מתעדכנים, לערוך השוואות, חיתוכים ולחקור את מצב האזור באופן מעמיק
              </p>
              <p>
                במערכת ניתן למצוא נתונים מנהליים בתחומים שונים שנאספים על ידי משרדי הממשלה והלשכה המרכזית לסטטיסטיקה וכן נתונים ייחודיים שנאספים במחקרים של מרכז הידע האזורי
              </p>
              <p>
                המערכת נועדה לאפשר לאשכול ולרשויות לבסס החלטות ולעצב מדיניות לאור למידה והעמקה בנתונים בתחומים השונים
              </p>
            </div>

            <Link to={createPageUrl('MunicipalityMap')}>
              <button className={styles.button}>
                היכנסו למערכת
              </button>
            </Link>

            {/* Partners Section */}
            <div className={styles.partnersSection}>
              <h3 className={styles.partnersTitle}>בשיתוף</h3>
              <div className={styles.partnersGrid}>
                <a 
                  href="https://eastgalil.org.il/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/8fe217f23_GalilMizrahiLogo.png"
                    alt="אשכול גליל מזרחי"
                    className={styles.partnerLogo}
                    style={{ maxWidth: '100px', height: 'auto' }}
                  />
                </a>
                <a 
                  href="https://www.telhai.ac.il/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/22bf94bbd_TelHaiLogo.png"
                    alt="תל-חי"
                    className={styles.partnerLogo}
                  />
                </a>
                <a 
                  href="https://www.roadburgfund.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/f98ca1770_RonaldRoadbergLogo.png"
                    alt="Ronald S. Roadburg Foundation"
                    className={styles.partnerLogo}
                  />
                </a>
                <a 
                  href="https://www.jewishcanada.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f59641fbcbe587b8e9864/faaef63f5_UiaLogo.png"
                    alt="UIA"
                    className={styles.partnerLogo}
                  />
                </a>
              </div>
            </div>
            </div>
            </div>
            </div>

      {/* Developer Credit */}
      <DeveloperTile 
        name="Gal Mitrani"
        link="https://www.linkedin.com/in/galmitrani1/"
      />

    </div>
  );
}