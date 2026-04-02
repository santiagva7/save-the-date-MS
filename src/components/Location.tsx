import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import upUp from "@/assets/upup.jpg";
import { DesignTheme } from "@/lib/designThemes";

interface LocationProps {
  theme?: DesignTheme;
}

const Location = ({ theme }: LocationProps) => {
  const address = "Salón Sanmarinense, Buenos Aires, Argentina";
  const coordinates = { lat: -33.9120039, lng: -60.57925339999999 };
  const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  const googleMapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.13193094809!2d-60.57925339999999!3d-33.9120039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b9b5353df98d5d%3A0x3ed7ebfe051e4e71!2sSalon%20Sanmarinense!5e0!3m2!1ses!2sar!4v1775074850105!5m2!1ses!2sar";

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: `${theme?.colors.secondary}20` }}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile layout - Image on top */}
        <div className="md:hidden flex flex-col gap-0">
          <img 
            src={upUp} 
            alt="Couple photo" 
            className="w-full h-80 object-cover rounded-t-2xl"
          />
          
          {/* Content */}
          <div className="flex flex-col justify-center p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <MapPin className="w-5 h-5" style={{ color: theme?.colors.primary }} />
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
                >
                  Ubicación
                </span>
              </div>
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
              >
                ¿Dónde celebraremos?
              </h2>
              <p 
                className="max-w-xl mx-auto"
                style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
              >
                {address}
              </p>
            </div>

            <div 
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ backgroundColor: theme?.colors.light }}
            >
              <div className="aspect-video w-full">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la boda"
                ></iframe>
              </div>
              
              <div className="p-6">
                <Button
                  asChild
                  style={{ 
                    backgroundColor: theme?.colors.primary,
                    color: theme?.colors.text
                  }}
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
          </div>
        </div>

        {/* Desktop layout - Image on right */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-0 md:items-stretch">
          {/* Content - 2/3 */}
          <div className="md:col-span-2 flex flex-col justify-center p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <MapPin className="w-5 h-5" style={{ color: theme?.colors.primary }} />
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
                >
                  Ubicación
                </span>
              </div>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
              >
                ¿Dónde celebraremos?
              </h2>
              <p 
                className="max-w-xl mx-auto"
                style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
              >
                {address}
              </p>
            </div>

            <div 
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ backgroundColor: theme?.colors.light }}
            >
              <div className="aspect-video w-full">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la boda"
                ></iframe>
              </div>
              
              <div className="p-6">
                <Button
                  asChild
                  style={{ 
                    backgroundColor: theme?.colors.primary,
                    color: theme?.colors.text
                  }}
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
          </div>

          {/* Image - 1/3 */}
          <div>
            <img 
              src={upUp} 
              alt="Couple photo" 
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
