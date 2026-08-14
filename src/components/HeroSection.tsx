import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GuestInfo } from "@/data/guestCodes";

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
const tableBg = "#2b2622";
const gold = "#C5A253";
const glaucous = "#607C9A";
const taupe = "#8B7866";
const parchment = "#F7F3EE";

export const HeroSection = ({ guest }: HeroSectionProps) => {
  const shouldReduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <section
      style={{
        background: "#2b2622",
        minHeight: "100svh",
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
          minHeight: "100svh",
          background: parchment,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Double-rule engraved border */}
        <div aria-hidden style={{ position: "absolute", inset: 18, border: "1.5px solid rgba(75,53,42,.55)", pointerEvents: "none", zIndex: 5 }} />
        <div aria-hidden style={{ position: "absolute", inset: 24, border: ".75px solid rgba(197,162,83,.65)", pointerEvents: "none", zIndex: 5 }} />

        {/* ── Content — three zones, space-between fills the card height ──── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            flex: 1,
            padding: "56px 46px 52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >

          {/* ── Zone 1: identity ─────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Names */}
            <motion.div
              style={{
                fontFamily: "'Slight', 'Pinyon Script', cursive",
                fontSize: 62,
                lineHeight: 1.05,
                color: ink,
              }}
              {...fade(0.45, 1.4)}
            >
              M & S
            </motion.div>

            {/* "Reservá la fecha" */}
            <motion.p
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 12,
                letterSpacing: ".4em",
                textTransform: "uppercase",
                color: taupe,
                marginTop: 8,
                paddingLeft: ".4em",
              }}
              {...rise(0.9, 1.0)}
            >
              Reservá la fecha
            </motion.p>
          </div>

          {/* ── Zone 2: dates + message ───────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {/* Flourish divider */}
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}
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

            {/* Dates */}
            <motion.div
              style={{ display: "flex", width: "100%", maxWidth: 330 }}
              {...rise(1.35, 1.0)}
            >
              {/* Civil */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 6px" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".34em", textTransform: "uppercase", color: ink }}>Civil</span>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: ink }}>Fecha a confirmar</span>
                <span style={{ fontSize: 13, color: taupe, letterSpacing: ".02em" }}>Horario a confirmar</span>
              </div>

              {/* Hairline separator */}
              <div style={{ width: 1, alignSelf: "stretch", background: "rgba(75,53,42,.2)", margin: "4px 0" }} />

              {/* Ceremonia */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 6px" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".34em", textTransform: "uppercase", color: ink }}>Ceremonia</span>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: ink }}>10 de Enero, 2027</span>
                <span style={{ fontSize: 13, color: taupe, letterSpacing: ".02em" }}>Horario a confirmar</span>
              </div>
            </motion.div>

            {/* Personalized message */}
            {guest.message && (
              <motion.p
                style={{
                  marginTop: 32,
                  maxWidth: 320,
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: ink,
                }}
                {...rise(1.7, 1.1)}
              >
                {guest.message}
              </motion.p>
            )}
          </div>

          {/* ── Zone 3: footer affordances ───────────────────────────────── */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
            {...fade(2.1, 1.0)}
          >
            {/* Music button — hairline circle + hint */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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
              <span
                aria-hidden
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: 9.5,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: taupe,
                  paddingLeft: ".24em",
                }}
              >
                {playing ? "Tocá para pausar" : "Tocá para escuchar"}
              </span>
            </div>

            {/* Chevron scroll hint — floats gently */}
            <motion.div
              style={{
                width: 16, height: 16,
                borderRight: `1.5px solid ${gold}`,
                borderBottom: `1.5px solid ${gold}`,
                transform: "rotate(45deg)",
                opacity: 0.7,
              }}
              animate={shouldReduce ? {} : { translateY: [0, 3, 0] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: 3 }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
