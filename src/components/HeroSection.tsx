import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GuestInfo } from "@/data/guestCodes";
import weddingHero from "@/assets/wedding-hero.jpg";
import weddingHeroMb from "@/assets/wedding-hero-mb.jpg";

// ── Audio config (mirrored from MusicButton) ──────────────────────────────────
const AUDIO_SRC = "/ambient.mp3";
const TARGET_VOLUME = 0.4;
const START_SECOND = 15;

interface HeroSectionProps {
  guest: GuestInfo;
}

// ── Music note SVG ─────────────────────────────────────────────────────────────
const MusicNote = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path d="M5 12.5V3l7-1.5V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="3" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="10" cy="11" r="2" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const PauseIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <rect x="1" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
    <rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
  </svg>
);

// ── Shared style tokens ────────────────────────────────────────────────────────
const ink = "#4B352A";
const gold = "#C5A253";
const glaucous = "#607C9A";
const taupe = "#8B7866";
const parchment = "#F7F3EE";

export const HeroSection = ({ guest }: HeroSectionProps) => {
  const shouldReduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const fadeInAudio = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    const step = TARGET_VOLUME / 25;
    const interval = setInterval(() => {
      const next = Math.min(audio.volume + step, TARGET_VOLUME);
      audio.volume = next;
      if (next >= TARGET_VOLUME) clearInterval(interval);
    }, 40);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); return; }
    const isFirst = firstPlay;
    if (isFirst) { audio.currentTime = START_SECOND; setFirstPlay(false); }
    try {
      await audio.play();
      if (isFirst) fadeInAudio(audio);
    } catch { return; }
    setPlaying(true);
  };

  // ── Animation helpers ────────────────────────────────────────────────────────
  // initial={false} disables entry animation when user prefers reduced motion
  const rise = (delay: number, duration = 1.0) => ({
    initial: shouldReduce ? false as const : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration, ease: "easeOut" as const },
  });

  const fade = (delay: number, duration = 1.0) => ({
    initial: shouldReduce ? false as const : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration, ease: "easeOut" as const },
  });

  const scaleRule = (delay: number) => ({
    initial: shouldReduce ? false as const : { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { delay, duration: 0.9, ease: "easeOut" as const },
  });

  const bg = isMobile ? weddingHeroMb : weddingHero;

  return (
    <section
      style={{
        background: "#2b2622",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        color: ink,
      }}
    >
      {/* ── Paper ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 430,
          minHeight: 880,
          background: parchment,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Floral photo — slow zoom on entry, fixed px height avoids % calc issue */}
        <motion.div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 422,
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
          initial={shouldReduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 9, ease: "easeOut" }}
        />

        {/* Veil — fades photo into parchment (530px = ~60% of 880) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 530,
            background:
              "linear-gradient(180deg, rgba(247,243,238,0) 0%, rgba(247,243,238,.15) 40%, rgba(247,243,238,.85) 78%, #F7F3EE 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Double-rule engraved border */}
        <div aria-hidden style={{ position: "absolute", inset: 18, border: "1.5px solid rgba(75,53,42,.55)", pointerEvents: "none", zIndex: 5 }} />
        <div aria-hidden style={{ position: "absolute", inset: 24, border: ".75px solid rgba(197,162,83,.65)", pointerEvents: "none", zIndex: 5 }} />

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            padding: "0 46px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Spacer lets florals breathe */}
          <div style={{ height: 230 }} />

          {/* Rings ornament — replaces <Heart> */}
          <motion.svg
            width="40" height="28" viewBox="0 0 44 30" fill="none"
            style={{ marginBottom: 8 }}
            {...rise(0.2, 1.0)}
          >
            <circle cx="17" cy="15" r="11" stroke={gold} strokeWidth="1.2" />
            <circle cx="27" cy="15" r="11" stroke={gold} strokeWidth="1.2" />
          </motion.svg>

          {/* Names */}
          <motion.div
            style={{
              fontFamily: "'Slight', 'Pinyon Script', cursive",
              fontSize: 58,
              lineHeight: 1.02,
              color: ink,
              marginTop: 4,
            }}
            {...fade(0.45, 1.4)}
          >
            Melina &amp; Santiago
          </motion.div>

          {/* "Reservá la fecha" */}
          <motion.p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 12,
              letterSpacing: ".4em",
              textTransform: "uppercase",
              color: taupe,
              marginTop: 6,
              paddingLeft: ".4em",
            }}
            {...rise(0.9, 1.0)}
          >
            Reservá la fecha
          </motion.p>

          {/* Flourish divider — draws hairlines then reveals diamond */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 10, margin: "26px 0" }}
            {...fade(1.1, 0.8)}
          >
            <motion.div
              style={{
                width: 54, height: 1,
                background: `linear-gradient(90deg, transparent, ${gold} 60%, ${gold})`,
                transformOrigin: "right center",
              }}
              {...scaleRule(1.2)}
            />
            <motion.div
              style={{ width: 5, height: 5, background: gold, transform: "rotate(45deg)" }}
              {...fade(1.9, 0.5)}
            />
            <motion.div
              style={{
                width: 54, height: 1,
                background: `linear-gradient(270deg, transparent, ${gold} 60%, ${gold})`,
                transformOrigin: "left center",
              }}
              {...scaleRule(1.2)}
            />
          </motion.div>

          {/* Dates — pure typography, no cards, no icons */}
          <motion.div
            style={{ display: "flex", width: "100%", maxWidth: 330 }}
            {...rise(1.35, 1.0)}
          >
            {/* Civil */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "0 6px" }}>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".34em", textTransform: "uppercase", color: glaucous }}>Civil</span>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: ink }}>8 de Enero, 2027</span>
              <span style={{ fontSize: 13, color: taupe, letterSpacing: ".02em" }}>10:00 h</span>
            </div>

            {/* Hairline separator */}
            <div style={{ width: 1, alignSelf: "stretch", background: "rgba(75,53,42,.2)", margin: "4px 0" }} />

            {/* Ceremonia */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "0 6px" }}>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".34em", textTransform: "uppercase", color: glaucous }}>Ceremonia</span>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: ink }}>10 de Enero, 2027</span>
              <span style={{ fontSize: 13, color: taupe, letterSpacing: ".02em" }}>19:30 h</span>
            </div>
          </motion.div>

          {/* Personalized message — rescued from illegibility */}
          {guest.message && (
            <motion.p
              style={{
                marginTop: 34,
                maxWidth: 340,
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.6,
                color: ink,
              }}
              {...rise(1.7, 1.1)}
            >
              {guest.message}
            </motion.p>
          )}

          {/* Footer affordances — chevron + music */}
          <motion.div
            style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}
            {...fade(2.1, 1.0)}
          >
            {/* Chevron scroll hint — floats gently */}
            <motion.div
              style={{
                width: 18, height: 18,
                borderRight: `1.5px solid ${gold}`,
                borderBottom: `1.5px solid ${gold}`,
                transform: "rotate(45deg)",
                opacity: 0.8,
              }}
              animate={shouldReduce ? {} : { translateY: [0, 3, 0] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: 3 }}
            />

            {/* Music button — hairline circle */}
            <button
              onClick={toggleMusic}
              aria-label={playing ? "Pausar música" : "Reproducir música"}
              style={{
                width: 38, height: 38,
                border: "1px solid rgba(75,53,42,.4)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent",
                cursor: "pointer",
                color: ink,
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = ink)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(75,53,42,.4)")}
            >
              {playing ? <PauseIcon /> : <MusicNote />}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
