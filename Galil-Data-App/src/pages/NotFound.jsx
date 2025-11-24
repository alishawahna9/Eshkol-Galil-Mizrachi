import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Home, Map, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0F1F38] dark:to-[#0a1424] flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#22A7D6] to-[#1B4C8C] leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="bg-white dark:bg-[#1B4C8C] rounded-2xl shadow-2xl p-8 sm:p-12 mb-8">
          <div className="mb-6">
            <Search className="w-16 h-16 mx-auto text-[#22A7D6] mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1F38] dark:text-white mb-3">
              הדף לא נמצא
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              מצטערים, הדף שחיפשת לא קיים במערכת
            </p>
          </div>

          {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link
                to={createPageUrl('Home')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#22A7D6] to-[#1B4C8C] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
                <Home className="w-5 h-5" />
                דף הבית
            </Link>

            <Link
                to={createPageUrl('Home')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-[#0F1F38] border-2 border-[#22A7D6] text-[#22A7D6] dark:text-white rounded-xl font-medium hover:bg-[#22A7D6] hover:text-white transition-all duration-300 hover:scale-105"
            >
                <Home className="w-5 h-5" />
                מפת רשויות
            </Link>
            </div>

        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          אם אתה מאמין שזו שגיאה, אנא{' '}
          <a
            href="mailto:info@eastgalil.org.il"
            className="text-[#22A7D6] hover:text-[#6FD1F5] transition-colors underline"
          >
            צור קשר עם התמיכה
          </a>
        </p>
      </div>
    </div>
  );
}