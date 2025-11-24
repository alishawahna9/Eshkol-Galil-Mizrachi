import React from 'react';

export default function MapPlaceholder() {
  return (
    <div className="bg-gray-100 dark:bg-[#0F1F38] rounded-xl overflow-hidden h-full min-h-[600px] relative border-2 border-gray-300 dark:border-gray-700">
      {/* Mock map with polygons - Eastern Galilee Region */}
      <svg className="w-full h-full" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="500" height="600" fill="#E8EEF2" className="dark:fill-[#1B4C8C]" />
        
        {/* Sea of Galilee (Kinneret) - Central landmark */}
        <ellipse cx="280" cy="320" rx="45" ry="65" 
                 fill="#6FD1F5" opacity="0.5" stroke="#22A7D6" strokeWidth="2" />
        
        {/* Municipalities around Eastern Galilee */}
        
        {/* Safed/Tzfat (North) */}
        <path d="M 200 120 L 260 100 L 310 130 L 300 180 L 240 190 L 190 160 Z" 
              fill="#22A7D6" opacity="0.85" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="ציפת" />
        
        {/* Kiryat Shmona (Far North) */}
        <path d="M 150 60 L 210 50 L 240 80 L 230 120 L 180 130 L 140 100 Z" 
              fill="#8CD43A" opacity="0.75" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="קרית שמונה" />
        
        {/* Rosh Pina */}
        <path d="M 240 190 L 300 180 L 320 220 L 290 250 L 240 240 Z" 
              fill="#B33C9D" opacity="0.75" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="ראש פינה" />
        
        {/* Hatzor HaGlilit (East) */}
        <path d="M 320 220 L 370 210 L 390 260 L 370 310 L 320 300 Z" 
              fill="#1B4C8C" opacity="0.75" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="חצור הגלילית" />
        
        {/* Tiberias (Tverya - highlighted, by the Kinneret) */}
        <path d="M 240 280 L 220 320 L 230 370 L 270 380 L 290 340 L 280 290 Z" 
              fill="#22A7D6" opacity="0.9" stroke="#0F1F38" strokeWidth="3" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="טבריה" />
        
        {/* Migdal HaEmek (Southwest) */}
        <path d="M 160 380 L 210 370 L 230 420 L 200 460 L 150 450 Z" 
              fill="#D1B48C" opacity="0.75" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="מגדל העמק" />
        
        {/* Katzrin (Golan - East) */}
        <path d="M 370 310 L 420 300 L 440 350 L 420 400 L 370 390 Z" 
              fill="#6FD1F5" opacity="0.75" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="קצרין" />
        
        {/* Beit Shean Valley (South) */}
        <path d="M 290 420 L 340 410 L 360 470 L 330 520 L 280 510 Z" 
              fill="#8CD43A" opacity="0.75" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="בית שאן" />
        
        {/* Upper Galilee Regional Council */}
        <path d="M 140 140 L 190 130 L 210 180 L 180 220 L 140 210 Z" 
              fill="#B33C9D" opacity="0.7" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="מועצה אזורית גליל עליון" />
        
        {/* Merom HaGalil */}
        <path d="M 250 140 L 300 130 L 320 170 L 290 200 L 250 190 Z" 
              fill="#6FD1F5" opacity="0.7" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="מרום הגליל" />
        
        {/* Yodfat Regional */}
        <path d="M 180 220 L 230 210 L 240 260 L 200 280 L 170 250 Z" 
              fill="#22A7D6" opacity="0.7" stroke="#0F1F38" strokeWidth="2" 
              className="hover:opacity-100 transition-opacity cursor-pointer"
              data-municipality="רמת יוסף" />
      </svg>

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white dark:bg-[#1B4C8C] rounded shadow-lg flex items-center justify-center text-lg font-bold hover:bg-gray-100 dark:hover:bg-[#22A7D6] transition-colors">
          +
        </button>
        <button className="w-8 h-8 bg-white dark:bg-[#1B4C8C] rounded shadow-lg flex items-center justify-center text-lg font-bold hover:bg-gray-100 dark:hover:bg-[#22A7D6] transition-colors">
          −
        </button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 dark:text-gray-400">
        © Leaflet | Icon Map
      </div>
    </div>
  );
}