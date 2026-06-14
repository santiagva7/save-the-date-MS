import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuestInfo } from "@/data/guestCodes";
import weddingHero from "@/assets/wedding-hero.jpg";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import Dresscode from "@/components/Dresscode";
import RSVPSection from "@/components/RSVPSection";
import PhotoGallery from "@/components/PhotoGallery";
import HeroSection from "@/components/HeroSection";
import GiftRegistry from "@/components/GiftRegistry";
import FooterSection from "@/components/FooterSection";


const Invitation = () => {
  const navigate = useNavigate();
  const [guest, setGuest] = useState<GuestInfo | null>(null);

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

  const backgroundImage = weddingHero;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection guest={guest} />

      {/* Countdown Section */}
      <section className="bg-gradient-to-b from-background to-secondary/20">
        <Countdown />
      </section>
      
      <PhotoGallery />

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
      
      <RSVPSection />

      <FooterSection />
    </div>
  );
};

export default Invitation;
