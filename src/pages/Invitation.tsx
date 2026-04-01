import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Heart, Clock } from "lucide-react";
import { GuestInfo } from "@/data/guestCodes";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import Dresscode from "@/components/Dresscode";
import RSVPDialog from "@/components/RSVPDialog";
import weddingHero from "@/assets/wedding-hero.jpg";
import weddingHeroMb from "@/assets/wedding-hero-mb.jpg";
import backTruck from "@/assets/back-truck.jpg";
import GiftRegistry from "@/components/GiftRegistry";


const Invitation = () => {
  const navigate = useNavigate();
  const [guest, setGuest] = useState<GuestInfo | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const guestInfoStr = localStorage.getItem("guestInfo");
    if (!guestInfoStr) {
      navigate("/");
      return;
    }
    
    try {
      const guestInfo = JSON.parse(guestInfoStr);
      setGuest(guestInfo);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  if (!guest) {
    return null;
  }

  const backgroundImage = isMobile ? weddingHeroMb : weddingHero;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-wedding-gold" />
          
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            Melina & Santiago
          </h1>
          
          <div className="inline-block mb-6">
            <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-muted-foreground">
              Save the Date
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-wedding-gold/30">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-wedding-gold" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Civil</p>
                    <time className="font-medium text-sm md:text-base">8 de Enero, 2027</time>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Clock className="w-4 h-4 text-wedding-gold" />
                  <time className="text-sm text-muted-foreground">10:00</time>
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-wedding-gold/50">•</div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-wedding-gold/30">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-wedding-gold" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">Ceremonia</p>
                    <time className="font-medium text-sm md:text-base">10 de Enero, 2027</time>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Clock className="w-4 h-4 text-wedding-gold" />
                  <time className="text-sm text-muted-foreground">19:30</time>
                </div>
              </div>
            </div>
          </div>

          {guest.message && (
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto italic animate-slide-up">
              {guest.message}
            </p>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-wedding-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-wedding-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="bg-gradient-to-b from-background to-secondary/20">
        <Countdown />
      </section>
      
      {/* Timeline Section */}
      <section 
        className="bg-gradient-to-b from-background to-secondary/20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        <div className="relative z-10">
          <Timeline />
        </div>
      </section> 
      
      {/* Location Section */}
      <section>
        <Location />
      </section>

      {/* Dresscode Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background">
        <Dresscode />
      </section>
      
      {/* Gift Registry Section */}
      <section 
        className="bg-gradient-to-b from-secondary/20 to-background bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        <div className="relative z-10">
          <GiftRegistry />
        </div>
      </section>
      
      {/* RSVP Section */}
      <section className="py-12 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 items-stretch">
          {/* Content - 2/3 */}
          <div className="md:col-span-2 flex flex-col justify-center p-8 md:p-12 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Confirma tu asistencia
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
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
      <footer className="py-12 px-4 text-center bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-8 h-8 mx-auto mb-4 text-wedding-gold" />
          <p className="text-sm text-muted-foreground">
            Nos encantaría compartir este día especial contigo
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © 2027 Melina & Santiago
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Invitation;
