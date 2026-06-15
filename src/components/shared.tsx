/**
 * Componentes compartidos del sistema visual de la boda.
 * Todos los screens los usan — cambiar aquí afecta todo.
 */

import { forwardRef, InputHTMLAttributes, ButtonHTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ── Tokens de color ──────────────────────────────────────────────────────────
export const C = {
  parchment: "#F7F3EE",
  parchment2: "#EFE6DA",
  bone: "#D8CBBE",
  gold: "#C5A253",
  ink: "#4B352A",
  glaucous: "#607C9A",
  taupe: "#8B7866",
  tableBg: "#2b2622",
} as const;

// ── Paper (hoja 430px centrada sobre table-bg) ───────────────────────────────
interface PaperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  minHeight?: string | number;
}
export const Paper = ({ children, style, minHeight = "100svh" }: PaperProps) => (
  <section
    style={{
      background: C.tableBg,
      minHeight,
      display: "flex",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      color: C.ink,
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 430,
        minHeight,
        background: C.parchment,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  </section>
);

// ── EngravedFrame (doble filete grabado) ─────────────────────────────────────
export const EngravedFrame = () => (
  <>
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 18,
        border: "1.5px solid rgba(75,53,42,.55)",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 24,
        border: ".75px solid rgba(197,162,83,.65)",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  </>
);

// ── Overline ─────────────────────────────────────────────────────────────────
interface OverlineProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export const Overline = ({ children, style }: OverlineProps) => (
  <p
    style={{
      fontFamily: "Playfair Display, serif",
      fontSize: 12,
      letterSpacing: ".4em",
      textTransform: "uppercase",
      color: C.ink,
      paddingLeft: ".4em",
      ...style,
    }}
  >
    {children}
  </p>
);

// ── Flourish (divider de rombo) ──────────────────────────────────────────────
interface FlourishProps {
  style?: React.CSSProperties;
  ruleWidth?: number;
  animate?: boolean;
  delay?: number;
}
export const Flourish = ({ style, ruleWidth = 54, animate = false, delay = 0 }: FlourishProps) => {
  const shouldReduce = useReducedMotion();

  const ruleStyle = (dir: "ltr" | "rtl"): React.CSSProperties => ({
    width: ruleWidth,
    height: 1,
    background: dir === "ltr"
      ? `linear-gradient(90deg, transparent, ${C.gold} 60%, ${C.gold})`
      : `linear-gradient(270deg, transparent, ${C.gold} 60%, ${C.gold})`,
    transformOrigin: dir === "ltr" ? "right center" : "left center",
  });

  if (!animate || shouldReduce) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, ...style }}>
        <div style={ruleStyle("ltr")} />
        <div style={{ width: 5, height: 5, background: C.gold, transform: "rotate(45deg)" }} />
        <div style={ruleStyle("rtl")} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, ...style }}>
      <motion.div
        style={ruleStyle("ltr")}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0, duration: 0.9, ease: "easeOut" }}
      />
      <motion.div
        style={{ width: 5, height: 5, background: C.gold, transform: "rotate(45deg)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.7, duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        style={ruleStyle("rtl")}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0, duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
};

// ── LineInput (input con solo borde inferior) ────────────────────────────────
interface LineInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const LineInput = forwardRef<HTMLInputElement, LineInputProps>(
  ({ label, style, onFocus, onBlur, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderBottomColor = C.glaucous;
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderBottomColor = "rgba(75,53,42,.35)";
      onBlur?.(e);
    };
    return (
      <div style={{ width: "100%" }}>
        {label && (
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 11,
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: C.glaucous,
            marginBottom: 6,
          }}>
            {label}
          </p>
        )}
        <input
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(75,53,42,.35)",
            padding: "9px 2px",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: C.ink,
            outline: "none",
            caretColor: C.glaucous,
            transition: "border-color .25s",
            ...style,
          }}
          {...props}
        />
      </div>
    );
  }
);
LineInput.displayName = "LineInput";

// ── OutlineButton (el único CTA del sitio) ───────────────────────────────────
interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  accentColor?: string;
}
export const OutlineButton = ({ children, style, accentColor = C.ink, onMouseEnter, onMouseLeave, ...props }: OutlineButtonProps) => {
  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = accentColor;
    e.currentTarget.style.color = C.parchment;
    onMouseEnter?.(e);
  };
  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = accentColor;
    onMouseLeave?.(e);
  };
  return (
    <button
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: "transparent",
        border: `1.5px solid ${accentColor}`,
        color: accentColor,
        fontFamily: "Inter, sans-serif",
        fontSize: 12.5,
        fontWeight: 500,
        letterSpacing: ".32em",
        textTransform: "uppercase",
        padding: "15px 24px",
        cursor: "pointer",
        transition: "background-color .3s, color .3s",
        width: "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// ── OutlineLink (igual que OutlineButton pero como <a>) ──────────────────────
interface OutlineLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  accentColor?: string;
}
export const OutlineLink = ({ children, style, accentColor = C.ink, onMouseEnter, onMouseLeave, ...props }: OutlineLinkProps) => {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = accentColor;
    e.currentTarget.style.color = C.parchment;
    onMouseEnter?.(e);
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = accentColor;
    onMouseLeave?.(e);
  };
  return (
    <a
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "block",
        textAlign: "center",
        textDecoration: "none",
        background: "transparent",
        border: `1.5px solid ${accentColor}`,
        color: accentColor,
        fontFamily: "Inter, sans-serif",
        fontSize: 12.5,
        fontWeight: 500,
        letterSpacing: ".32em",
        textTransform: "uppercase",
        padding: "15px 24px",
        cursor: "pointer",
        transition: "background-color .3s, color .3s",
        width: "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </a>
  );
};

// ── TamedPhoto (foto + velo que funde en parchment hacia abajo) ──────────────
interface TamedPhotoProps {
  src: string;
  alt?: string;
  height?: number | string;
}
export const TamedPhoto = ({ src, alt = "", height = 280 }: TamedPhotoProps) => (
  <div style={{ position: "relative", width: "100%", height, flexShrink: 0 }}>
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
    {/* velo de degradado — funde en parchment */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, rgba(247,243,238,0) 0%, rgba(247,243,238,.5) 55%, rgba(247,243,238,.92) 82%, ${C.parchment} 100%)`,
        pointerEvents: "none",
      }}
    />
  </div>
);

// ── InViewFade (fade + rise al entrar en viewport) ───────────────────────────
interface InViewFadeProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}
export const InViewFade = ({ children, delay = 0, y = 14, style }: InViewFadeProps) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.9, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.div>
  );
};
