import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import handsBack from "@/assets/hands_back.jpg";
import { C, Paper, EngravedFrame, Overline, Flourish, InViewFade } from "./shared";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date("2027-01-10T18:00:00");

const calcTimeLeft = (): TimeLeft => {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "0 4px" }}>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          fontFamily: "Playfair Display, serif",
          fontWeight: 400,
          fontSize: 46,
          lineHeight: 1,
          color: C.glaucous,
          fontVariantNumeric: "tabular-nums",
          display: "block",
        }}
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
    <span style={{
      fontFamily: "Playfair Display, serif",
      fontSize: 10.5,
      letterSpacing: ".28em",
      textTransform: "uppercase",
      color: C.ink,
    }}>
      {label}
    </span>
  </div>
);

const Sep = () => (
  <div style={{ width: 1, height: 46, background: "rgba(75,53,42,.18)", alignSelf: "flex-start", marginTop: 0 }} />
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Paper>
      <EngravedFrame />

      <div style={{
        position: "relative",
        zIndex: 3,
        flex: 1,
        padding: "54px 46px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>

        {/* Foto enmarcada con passe-partout */}
        <InViewFade style={{ width: "100%" }}>
          <div style={{
            width: "100%",
            border: `1px solid rgba(75,53,42,.45)`,
            padding: 7,
            background: C.parchment,
          }}>
            <img
              src={handsBack}
              alt="Melina y Santiago"
              style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
            />
          </div>
        </InViewFade>

        <InViewFade delay={0.1} style={{ marginTop: 32 }}>
          <Overline>Cuenta regresiva</Overline>
        </InViewFade>

        <InViewFade delay={0.2}>
          <Flourish style={{ margin: "16px 0 28px" }} />
        </InViewFade>

        {/* Conteo — tipografía pura, sin cajas */}
        <InViewFade delay={0.3} style={{ width: "100%" }}>
          <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "flex-start" }}>
            <Unit value={timeLeft.days} label="Días" />
            <Sep />
            <Unit value={timeLeft.hours} label="Horas" />
            <Sep />
            <Unit value={timeLeft.minutes} label="Minutos" />
            <Sep />
            <Unit value={timeLeft.seconds} label="Segundos" />
          </div>
        </InViewFade>

        {/* Tagline */}
        <InViewFade delay={0.4} style={{ marginTop: 32, textAlign: "center" }}>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: 15,
            color: C.taupe,
            lineHeight: 1.5,
          }}>
            para el gran día
          </p>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 11,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: C.taupe,
            marginTop: 6,
          }}>
            10 de enero · 2027
          </p>
        </InViewFade>

      </div>
    </Paper>
  );
};

export default Countdown;
