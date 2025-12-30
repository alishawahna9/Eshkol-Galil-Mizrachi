"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type LType from "leaflet";

// 📍 Authority coordinates
const AUTHORITY_COORDS: Record<string, [number, number]> = {
  "צפת": [32.9646, 35.496],
  "קרית שמונה": [33.207, 35.572],
  "גולן": [32.982, 35.756],
  "הגליל העליון": [33.018, 35.471],
  "מרום הגליל": [32.914, 35.409],
};

// 🇮🇱 Default bounds for Israel (SW, NE) — used to ensure the map always shows the whole country
const ISRAEL_BOUNDS: [number, number][] = [
  [29.45, 34.20], // south-west (Eilat area)
  [33.35, 35.95], // north-east (Upper Galilee / border)
];

// ✈️ Fly to selected authority
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
    // ensure the map resizes after it's mounted and on window resize
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
    // always include Israel bounds so the country is visible by default
    const combined = (coordsList && coordsList.length > 0) ? [...coordsList, ...ISRAEL_BOUNDS] : ISRAEL_BOUNDS;

    // wait a bit so the container has a correct size, then fit bounds
    setTimeout(() => {
      try {
        map.invalidateSize();
        map.fitBounds(combined as any, { padding: [40, 40], maxZoom: 8 });
      } catch (e) {
        // ignore if fitBounds fails for any reason
      }
    }, 120);
  }, [coordsList, map]);

  return null;
}

type Props = {
  selectedAuthority?: string | null;
};

export default function AuthoritiesMap({ selectedAuthority }: Props) {
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();

  const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const DARK_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const tileUrl = (resolvedTheme ?? "light") === "dark" ? DARK_URL : OSM_URL;

  // ✅ Load leaflet ONLY on client
  useEffect(() => {
    let L: typeof LType;

    (async () => {
      const leaflet = await import("leaflet");
      L = leaflet.default;

      // 🔧 Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setReady(true);
    })();
  }, []);

  if (!ready) return null; // ⏳ avoid SSR / hydration issues

  const coordsList = Object.values(AUTHORITY_COORDS);

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
          attribution={
            (tileUrl === DARK_URL
              ? '© OpenStreetMap contributors © CARTO'
              : '© OpenStreetMap contributors')
          }
        />

        <MapAutoResize />
        <FitBoundsToMarkers coordsList={coordsList} />
        <FlyToAuthority name={selectedAuthority} />

        {Object.entries(AUTHORITY_COORDS).map(([name, coords]) => (
          <CircleMarker
            key={name}
            center={coords}
            radius={8}
            pathOptions={{
              color: "var(--primary)",
              fillColor: "var(--primary)",
              fillOpacity: 0.9,
            }}
          >
            <Popup className="bg-card text-foreground border-border">{name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* small legend */}
      <div className="absolute top-3 right-3 z-40 rounded-md bg-card/80 border border-border px-2 py-1 text-xs text-muted-foreground">
        מיקומים: {coordsList.length}
      </div>
    </div>
  );
}
