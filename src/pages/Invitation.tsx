import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuestInfo } from "@/data/guestCodes";
import Cover from "@/components/Cover";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import Dresscode from "@/components/Dresscode";
import RSVPSection from "@/components/RSVPSection";
import GiftRegistry from "@/components/GiftRegistry";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";

const Invitation = () => {
  const navigate = useNavigate();
  const [guest, setGuest] = useState<GuestInfo | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("guestInfo");
    if (!raw) { navigate("/"); return; }
    try {
      setGuest(JSON.parse(raw));
    } catch {
      navigate("/");
    }
  }, [navigate]);

  if (!guest) return null;

  return (
    <div>
      <Cover />
      <HeroSection guest={guest} />
      <Countdown />
      <Timeline />
      <Location />
      <Dresscode />
      <GiftRegistry />
      <RSVPSection />
      <FooterSection />
    </div>
  );
};

export default Invitation;
