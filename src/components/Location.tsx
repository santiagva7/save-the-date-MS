import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import upUp from "@/assets/upup.jpg";
import { DesignTheme } from "@/lib/designThemes";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface LocationProps {
  theme?: DesignTheme;
}

const goldMarker = new L.DivIcon({
  html: `<div style="width:18px;height:18px;border-radius:50%;background-color:#D4AF37;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.4);"></div>`,
  className: '',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const Location = ({ theme }: LocationProps) => {
  const address = "Salón Sanmarinense, Buenos Aires, Argentina";
  const coordinates: [number, number] = [-33.9120039, -60.57925339999999];
  const googleMapsUrl = `https://www.google.com/maps?q=${coordinates[0]},${coordinates[1]}`;

  const { ref, isVisible } = useScrollAnimation();

  const leafletMap = (
    <MapContainer
      center={coordinates}
      zoom={15}
      style={{ height: '280px', width: '100%' }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <Marker position={coordinates} icon={goldMarker} />
    </MapContainer>
  );

  const mapCard = (
    <div className="rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: theme?.colors.light }}>
      {leafletMap}
      <div className="p-6">
        <Button
          asChild
          style={{ backgroundColor: theme?.colors.primary, color: theme?.colors.text }}
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full font-medium"
          >
            <Navigation className="w-4 h-4" />
            Cómo llegar
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <div ref={ref} className="w-full py-12 px-4" style={{ backgroundColor: `${theme?.colors.secondary}20` }}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile layout — Image on top */}
        <div className="md:hidden flex flex-col gap-0">
          <img
            src={upUp}
            alt="Couple photo"
            className={`w-full h-80 object-cover rounded-t-2xl ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          />
          <div className={`flex flex-col justify-center p-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-2 mb-4 justify-center ${isVisible ? 'animate-slide-up-delay-200' : 'opacity-0'}`}>
                <MapPin className="w-5 h-5" style={{ color: theme?.colors.primary }} />
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}>
                  Ubicación
                </span>
              </div>
              <h2
                className={`text-3xl font-bold mb-2 ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}
                style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
              >
                ¿Dónde celebraremos?
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}>
                {address}
              </p>
            </div>
            {mapCard}
          </div>
        </div>

        {/* Desktop layout — Image on right */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-0 md:items-stretch">
          <div className={`md:col-span-2 flex flex-col justify-center p-8 md:p-12 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-2 mb-4 justify-center ${isVisible ? 'animate-slide-up-delay-300' : 'opacity-0'}`}>
                <MapPin className="w-5 h-5" style={{ color: theme?.colors.primary }} />
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}>
                  Ubicación
                </span>
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-2 ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}
                style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
              >
                ¿Dónde celebraremos?
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}>
                {address}
              </p>
            </div>
            {mapCard}
          </div>

          <div className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <img src={upUp} alt="Couple photo" className="w-full h-full object-cover rounded-r-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
