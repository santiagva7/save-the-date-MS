import { Heart, Calendar } from "lucide-react";
import { GuestInfo } from "@/data/guestCodes";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import Dresscode from "@/components/Dresscode";
import RSVPDialog from "@/components/RSVPDialog";
import GiftRegistry from "@/components/GiftRegistry";
import { DesignTheme } from "@/lib/designThemes";
import weddingHero from "@/assets/wedding-hero.jpg";
import backTruck from "@/assets/back-truck.jpg";

interface InvitationPreviewProps {
  guest: GuestInfo;
  theme: DesignTheme;
}

const InvitationPreview = ({ guest, theme }: InvitationPreviewProps) => {
  const themeStyle = `
    :root {
      --design-primary: ${theme.colors.primary};
      --design-secondary: ${theme.colors.secondary};
      --design-accent: ${theme.colors.accent};
      --design-dark: ${theme.colors.dark};
      --design-light: ${theme.colors.light};
      --design-text: ${theme.colors.text};
      --design-background: ${theme.colors.background};
      --design-heading-font: ${theme.fonts.heading};
      --design-body-font: ${theme.fonts.body};
    }
    
    .design-wrapper {
      --foreground: ${theme.colors.text};
      --background: ${theme.colors.background};
      --wedding-gold: ${theme.colors.primary};
      --accent: ${theme.colors.accent};
      --secondary: ${theme.colors.secondary};
    }
    
    .design-wrapper h1,
    .design-wrapper h2,
    .design-wrapper h3,
    .design-wrapper h4,
    .design-wrapper h5,
    .design-wrapper h6 {
      font-family: ${theme.fonts.heading};
      color: ${theme.colors.text};
    }
    
    .design-wrapper body,
    .design-wrapper p,
    .design-wrapper span,
    .design-wrapper label {
      font-family: ${theme.fonts.body};
    }
    
    .design-wrapper .font-playfair {
      font-family: ${theme.fonts.heading};
    }
  `;

  return (
    <>
      <style>{themeStyle}</style>
      <div className="design-wrapper min-h-screen" style={{ backgroundColor: theme.colors.background }}>
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: `url(${weddingHero})`,
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px)'
            }}
          />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" style={{ color: theme.colors.primary }} />

            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
            >
              Melina & Santiago
            </h1>

            <div className="inline-block mb-6">
              <p 
                className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase"
                style={{ color: theme.colors.secondary }}
              >
                Save the Date
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-lg md:text-xl mb-8" style={{ color: theme.colors.text }}>
              <Calendar className="w-5 h-5" style={{ color: theme.colors.primary }} />
              <time className="font-medium">10 de Enero, 2027</time>
            </div>

            {guest.message && (
              <p 
                className="text-base md:text-lg max-w-2xl mx-auto italic animate-slide-up"
                style={{ color: theme.colors.accent, fontFamily: theme.fonts.body }}
              >
                {guest.message}
              </p>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div 
              className="w-6 h-10 rounded-full flex items-start justify-center p-2"
              style={{ borderColor: theme.colors.primary, borderWidth: '2px' }}
            >
              <div 
                className="w-1 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section style={{ backgroundColor: theme.colors.background }}>
          <Countdown theme={theme} />
        </section>

        {/* Timeline Section */}
        <section style={{ backgroundColor: theme.colors.background }}>
          <Timeline theme={theme} />
        </section>

        {/* Location Section */}
        <section>
          <Location theme={theme} />
        </section>

        {/* Dresscode Section */}
        <section style={{ backgroundColor: theme.colors.background }}>
          <Dresscode />
        </section>

        {/* Gift Registry Section */}
        <section style={{ backgroundColor: theme.colors.background }}>
          <GiftRegistry />
        </section>

        {/* RSVP Section */}
        <section 
          className="w-full py-12 px-4"
          style={{ backgroundColor: `${theme.colors.secondary}10` }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch w-full">
            {/* Content - 2/3 */}
            <div className="w-full md:col-span-2 flex flex-col justify-center p-8 md:p-12 text-center">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.text }}
              >
                Confirma tu asistencia
              </h2>
              <p 
                className="mb-8 max-w-xl mx-auto"
                style={{ color: theme.colors.accent, fontFamily: theme.fonts.body }}
              >
                Nos encantaría contar con vos en esta celebración. Por favor, hacenos saber si vas a poder asistir.
              </p>
              <RSVPDialog />
            </div>

            {/* Image - 1/3 */}
            <div className="hidden md:block">
              <img 
                src={backTruck} 
                alt="Couple photo" 
                className="w-full h-full object-cover rounded-r-2xl"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="w-full py-12 px-4 text-center"
          style={{ backgroundColor: `${theme.colors.secondary}20` }}
        >
          <div className="max-w-4xl mx-auto">
            <Heart className="w-8 h-8 mx-auto mb-4" style={{ color: theme.colors.primary }} />
            <p 
              className="text-sm"
              style={{ color: theme.colors.accent, fontFamily: theme.fonts.body }}
            >
              Nos encantaría compartir este día especial contigo
            </p>
            <p 
              className="text-xs mt-4"
              style={{ color: theme.colors.accent, fontFamily: theme.fonts.body }}
            >
              © 2027 Melina & Santiago
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InvitationPreview;
