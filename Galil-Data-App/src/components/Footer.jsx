import React from "react";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-[#0F1F38] to-[#0A1424] text-gray-300 pt-12 pb-6">
      {/* Frosted contrast overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* About */}
          <div className="space-y-3 text-center md:text-right">
            <h3 className="text-lg font-bold text-white border-r-4 border-[#22A7D6] pr-3">
              אודות
            </h3>
            <p className="text-sm text-gray-400">
              מערכת DATA – גליל מזרחי
            </p>
            <p className="text-sm text-gray-400">
              מרכז ידע אזורי לניתוח נתונים וקבלת החלטות מבוססות מידע.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-center md:text-right">
            <h3 className="text-lg font-bold text-white border-r-4 border-[#22A7D6] pr-3">
              יצירת קשר
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:info@eastgalil.org.il"
                className="flex items-center gap-2 hover:text-[#6FD1F5] transition"
              >
                <Mail className="w-4 h-4" />
                info@eastgalil.org.il
              </a>

              <a
                href="tel:+97246900000"
                className="flex items-center gap-2 hover:text-[#6FD1F5] transition"
              >
                <Phone className="w-4 h-4" />
                04-6900000
              </a>

              <div className="flex items-center gap-2 text-gray-500 cursor-default">
                <MapPin className="w-4 h-4" />
                גליל מזרחי, ישראל
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 text-center md:text-right">
            <h3 className="text-lg font-bold text-white border-r-4 border-[#22A7D6] pr-3">
              קישורים
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://eastgalil.org.il/"
                target="_blank"
                className="hover:text-[#6FD1F5] transition"
              >
                אשכול גליל מזרחי
              </a>

              <a
                href="https://www.telhai.ac.il/"
                target="_blank"
                className="hover:text-[#6FD1F5] transition"
              >
                מכללת תל-חי
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

            {/* Copyright */}
            <div className="text-gray-500 text-xs md:text-sm text-center md:text-right">
              © 2025 מרכז ידע אזורי גליל מזרחי — כל הזכויות שמורות.
            </div>

            {/* Developer */}
            <a
              href="https://www.linkedin.com/in/galmitrani1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#22A7D6] hover:text-[#6FD1F5] transition-colors"
            >
              <span className="text-gray-300">Gal Mitrani</span>
              <span className="text-gray-500">Developed By</span>
              <Linkedin className="w-6 h-6" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}
