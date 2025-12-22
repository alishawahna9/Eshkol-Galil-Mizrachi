// components/authorities/AuthoritiesMap.tsx
"use client";

export default function AuthoritiesMap() {
  return (
    <section
      className="
        h-full
        bg-white
        rounded-xl
        border
        shadow-sm
        relative
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="px-4 py-3 border-b font-semibold text-sm">
        מפת הרשויות המקומיות
      </div>

      {/* MAP AREA */}
      <div className="h-[calc(100%-48px)] flex items-center justify-center text-slate-400">
        {/* כאן תיכנס Leaflet / Mapbox */}
        MAP PLACEHOLDER
      </div>
    </section>
  );
}
