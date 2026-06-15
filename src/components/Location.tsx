import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import upUp from "@/assets/upup.jpg";
import { C, Paper, EngravedFrame, Overline, Flourish, TamedPhoto, OutlineLink, InViewFade } from "./shared";

const COORDS: [number, number] = [-33.9120039, -60.57925339999999];
const MAPS_URL = `https://www.google.com/maps?q=${COORDS[0]},${COORDS[1]}`;

// Marcador rombo dorado
const diamondMarker = L.divIcon({
  html: `<div style="position:relative;width:20px;height:20px;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;width:20px;height:20px;border-radius:50%;background:#F7F3EE;"></div>
    <div style="position:relative;width:9px;height:9px;background:#C5A253;transform:rotate(45deg);"></div>
  </div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Fuerza invalidateSize tras montar el mapa
const MapFixer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
};

const Location = () => {
  return (
    <Paper>
      <EngravedFrame />

      <TamedPhoto src={upUp} alt="Melina y Santiago" height={260} />

      <div style={{
        position: "relative",
        zIndex: 3,
        flex: 1,
        padding: "0 46px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        <InViewFade>
          <Overline style={{ marginTop: 4, color: C.glaucous }}>Ubicación</Overline>
        </InViewFade>
        <InViewFade delay={0.1}>
          <h2 style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 28,
            color: C.ink,
            marginTop: 8,
          }}>
            ¿Dónde celebraremos?
          </h2>
        </InViewFade>
        <InViewFade delay={0.15}>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: 14,
            color: C.taupe,
            marginTop: 8,
          }}>
            Salón Sanmarinense
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.glaucous, marginTop: 3, letterSpacing: ".02em" }}>
            Pergamino, Buenos Aires, Argentina
          </p>
        </InViewFade>
        <InViewFade delay={0.2}>
          <Flourish style={{ margin: "20px 0" }} />
        </InViewFade>

        {/* Mapa con keyline mocha, sepia via CSS, sin card/sombra */}
        <InViewFade delay={0.25} style={{ width: "100%" }}>
          <div style={{
            width: "100%",
            border: `1px solid rgba(75,53,42,.45)`,
            overflow: "hidden",
          }}>
            <style>{`
              .leaflet-tile-pane {
                filter: sepia(.55) saturate(.75) brightness(1.03) contrast(.92) hue-rotate(-8deg);
              }
              .leaflet-attribution-flag { display: none !important; }
              .leaflet-control-attribution {
                font-family: Inter, sans-serif;
                font-size: 9px;
                color: #8B7866;
                background: rgba(247,243,238,.75);
              }
              .leaflet-control-attribution a { color: #607C9A; }
            `}</style>
            <MapContainer
              center={COORDS}
              zoom={15}
              style={{ height: 240, width: "100%" }}
              scrollWheelZoom={false}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <Marker position={COORDS} icon={diamondMarker} />
              <MapFixer />
            </MapContainer>
          </div>
        </InViewFade>

        <InViewFade delay={0.3} style={{ width: "100%", marginTop: 20}}>
          <OutlineLink href={MAPS_URL} target="_blank" rel="noopener noreferrer" accentColor={C.ink}>
            Cómo llegar
          </OutlineLink>
        </InViewFade>
      </div>
    </Paper>
  );
};

export default Location;
