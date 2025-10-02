import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import couplePhoto2 from "@/assets/couple-photo-2.jpg";

const Location = () => {
  const address = "Argentina";
  const coordinates = { lat: -33.892539, lng: -60.541541 };
  const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  const googleMapsEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.5!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUzJzMzLjEiUyA2MMKwMzInMjkuNSJX!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`;

  return (
    <div className="py-12 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 items-stretch">
        {/* Content - 2/3 */}
        <div className="md:col-span-2 flex flex-col justify-center p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-wedding-gold" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Ubicación
              </span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              Dónde celebraremos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {address}
            </p>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]">
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
                className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-foreground font-medium"
              >
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Cómo llegar
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Image - 1/3 */}
        <div className="hidden md:block">
          <img 
            src={couplePhoto2} 
            alt="Couple photo" 
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
