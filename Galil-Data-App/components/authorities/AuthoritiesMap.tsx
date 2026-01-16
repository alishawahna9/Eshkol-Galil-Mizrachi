"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type LType from "leaflet";

const AUTHORITY_COORDS: Record<string, [number, number]> = {
  "בוקעאתא": [33.2429, 35.7768],
  "גולן": [32.9910, 35.7420],
  "גוש חלב (ג'יש)": [33.0246, 35.4486],
  "הגליל העליון": [33.0140, 35.5020],
  "חצור הגלילית": [32.9818, 35.5426],
  "טובא - זנגרייה": [32.9695, 35.5927],
  "יסוד המעלה": [33.0533, 35.6067],
  "מבואות החרמון": [33.1660, 35.6460],
  "מגדל שמס": [33.2687, 35.7707],
  "מטולה": [33.2767, 35.5797],
  "מסעדה": [33.2307, 35.7547],
  "מרום הגליל": [32.9630, 35.4230],
  "ע'ג'ר": [33.2730, 35.6240],
  "עין קיניה": [33.2400, 35.7270],
  "צפת": [32.9646, 35.4960],
  "קצרין": [32.9900, 35.6890],
  "קרית שמונה": [33.2070, 35.5720],
  "ראש פינה": [32.9683, 35.5420],
};


const ISRAEL_BOUNDS: [number, number][] = [
  [29.45, 34.20],
  [33.35, 35.95],
];

function FlyToAuthority({ name }: { name?: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!name) return;
    const coords = AUTHORITY_COORDS[name];
    if (!coords) return;
    map.flyTo(coords, 10, { duration: 1.2 });
  }, [name, map]);

  return null;
}

function MapAutoResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 0);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [map]);
  return null;
}

function FitBoundsToMarkers({ coordsList }: { coordsList: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    const combined =
      coordsList && coordsList.length > 0 ? [...coordsList, ...ISRAEL_BOUNDS] : ISRAEL_BOUNDS;

    setTimeout(() => {
      try {
        map.invalidateSize();
        map.fitBounds(combined as any, { padding: [40, 40], maxZoom: 8 });
      } catch (e) {}
    }, 120);
  }, [coordsList, map]);
  return null;
}

type Props = {
  selectedAuthority?: string | null;
  onSelectAuthority?: (name: string) => void;
  availableAuthorities?: string[]; // רשימת הרשויות שבפועל מוצגות בטבלה
};

export default function AuthoritiesMap({ selectedAuthority, onSelectAuthority, availableAuthorities }: Props) {
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();

  const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const DARK_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const tileUrl = (resolvedTheme ?? "light") === "dark" ? DARK_URL : OSM_URL;

  useEffect(() => {
    let L: typeof LType;
    (async () => {
      const leaflet = await import("leaflet");
      L = leaflet.default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setReady(true);
    })();
  }, []);

  if (!ready) return null;

  // סנן את הקואורדינטות רק לרשויות שמוצגות בטבלה
  const filteredCoords = availableAuthorities
    ? Object.entries(AUTHORITY_COORDS).filter(([name]) => availableAuthorities.includes(name))
    : Object.entries(AUTHORITY_COORDS);
  
  const coordsList = filteredCoords.map(([, coords]) => coords);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl z-0">
      <MapContainer
        center={[31.0461, 34.8516]}
        zoom={7}
        className="w-full h-full"
        scrollWheelZoom
      >
        <TileLayer
          key={resolvedTheme}
          url={tileUrl}
          attribution={tileUrl === DARK_URL ? "© OpenStreetMap contributors © CARTO" : "© OpenStreetMap contributors"}
        />

        <MapAutoResize />
        <FitBoundsToMarkers coordsList={coordsList} />
        <FlyToAuthority name={selectedAuthority} />

        {filteredCoords.map(([name, coords]) => (
          <CircleMarker
            key={name}
            center={coords}
            radius={8}
            pathOptions={{
              color: "var(--primary)",
              fillColor: "var(--primary)",
              fillOpacity: 0.9,
            }}
            eventHandlers={{
              click: () => onSelectAuthority?.(name),
            }}
          >
            <Popup className="bg-card text-foreground border-border">{name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute top-3 right-3 z-40 rounded-md bg-card/80 border border-border px-2 py-1 text-xs text-muted-foreground">
        מיקומים: {filteredCoords.length}
      </div>
    </div>
  );
}
