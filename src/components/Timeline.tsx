import { motion, useReducedMotion } from "framer-motion";
import weddingHero from "@/assets/wedding-hero.jpg";
import { C, Paper, EngravedFrame, Overline, Flourish, TamedPhoto, InViewFade } from "./shared";

interface TimelineEvent {
  time: string;
  title: string;
  place: string;
  desc?: string;
}

const EVENTS: TimelineEvent[] = [
  { time: "Horario a confirmar", title: "Recepción",         place: "Parque del salón",    desc: "Bienvenida y aperitivos" },
  { time: "22:00", title: "Cena",              place: "Comedor principal",  desc: "Cena servida a la mesa" },
  { time: "23:30", title: "Brindis y juegos",  place: "Salón principal",    desc: "Brindis especial · Barra abierta" },
];

/* ─────────────────────────────────────────────────────────────────────────────
 * TEASER "CRONOGRAMA EN CAMINO"
 * Mientras esté en false se tapa el riel de horarios y se muestra el cartelito.
 * Para publicar el cronograma: poner true (y, si querés, borrar CronogramaTeaser
 * + este bloque de comentario). Nada más que tocar.
 * ────────────────────────────────────────────────────────────────────────── */
const CRONOGRAMA_DISPONIBLE = false;

const CronogramaTeaser = () => (
  <InViewFade delay={0.3} style={{ width: "100%" }}>
    <div style={{
      position: "relative",
      width: "100%",
      padding: "34px 26px 32px",
      textAlign: "center",
      border: `1px solid ${C.gold}55`,
      background: `linear-gradient(180deg, ${C.parchment} 0%, ${C.parchment2}88 100%)`,
    }}>
      {/* Rombitos en las esquinas */}
      {[
        { top: -3.5, left: -3.5 }, { top: -3.5, right: -3.5 },
        { bottom: -3.5, left: -3.5 }, { bottom: -3.5, right: -3.5 },
      ].map((pos, i) => (
        <span key={i} aria-hidden style={{
          position: "absolute",
          width: 7, height: 7,
          background: C.gold,
          transform: "rotate(45deg)",
          ...pos,
        }} />
      ))}

      <span style={{
        fontFamily: "Playfair Display, serif",
        fontSize: 10,
        letterSpacing: ".28em",
        textTransform: "uppercase",
        color: C.glaucous,
        display: "block",
      }}>
        Próximamente
      </span>

      <p style={{
        fontFamily: "Playfair Display, serif",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: 21,
        lineHeight: 1.35,
        color: C.ink,
        marginTop: 12,
      }}>
        ¡Dentro de poco vas a poder<br />ver el cronograma!
      </p>

      <Flourish style={{ margin: "18px 0", justifyContent: "center" }} />

      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        lineHeight: 1.6,
        color: C.taupe,
      }}>
        Estamos terminando de acomodar los últimos detalles.
        Cuando esté todo cerrado lo vas a ver acá mismo.
      </p>
    </div>
  </InViewFade>
);

// Nodo de rombo dorado con halo parchment
const DiamondNode = () => (
  <div style={{ position: "relative", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <div style={{
      position: "absolute",
      width: 20, height: 20,
      borderRadius: "50%",
      background: C.parchment,
    }} />
    <div style={{
      position: "relative",
      width: 8, height: 8,
      background: C.gold,
      transform: "rotate(45deg)",
    }} />
  </div>
);

const Timeline = () => {
  const shouldReduce = useReducedMotion();

  return (
    <Paper>
      <EngravedFrame />

      {/* Foto + velo */}
      <TamedPhoto src={weddingHero} alt="Melina y Santiago" height={260} />

      <div style={{
        position: "relative",
        zIndex: 3,
        flex: 1,
        padding: "0 46px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        <InViewFade>
          <Overline style={{ marginTop: 4, color: C.glaucous }}>10 de enero · 2027</Overline>
        </InViewFade>
        <InViewFade delay={0.1}>
          <h2 style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 28,
            color: C.ink,
            marginTop: 8,
          }}>
            Programa del día
          </h2>
        </InViewFade>
        <InViewFade delay={0.2}>
          <Flourish style={{ margin: "20px 0 32px" }} />
        </InViewFade>

        {!CRONOGRAMA_DISPONIBLE && <CronogramaTeaser />}

        {/* Riel vertical */}
        {CRONOGRAMA_DISPONIBLE && (
        <div style={{ position: "relative", width: "100%", textAlign: "left" }}>
          {/* Línea vertical hairline */}
          <div style={{
            position: "absolute",
            left: 9,
            top: 10,
            bottom: 10,
            width: 1,
            background: `linear-gradient(to bottom, ${C.gold}55, ${C.gold}88, ${C.gold}33)`,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {EVENTS.map((ev, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  paddingBottom: i < EVENTS.length - 1 ? 32 : 0,
                }}
              >
                {/* Nodo */}
                <DiamondNode />

                {/* Cuerpo */}
                <div style={{ flex: 1, paddingTop: 1 }}>
                  <span style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 23,
                    color: C.ink,
                    fontVariantNumeric: "tabular-nums",
                    display: "block",
                    lineHeight: 1,
                  }}>
                    {ev.time}
                  </span>
                  <span style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 11,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: C.ink,
                    display: "block",
                    marginTop: 5,
                  }}>
                    {ev.title}
                  </span>
                  {/* Lugar — punto dorado, sin MapPin */}
                  <span style={{
                    fontFamily: "Playfair Display, serif",
                    fontStyle: "italic",
                    fontSize: 13,
                    color: C.taupe,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 4,
                  }}>
                    <span style={{ width: 4, height: 4, background: C.gold, borderRadius: 0, transform: "rotate(45deg)", flexShrink: 0, display: "inline-block" }} />
                    {ev.place}
                  </span>
                  {ev.desc && (
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12.5,
                      color: C.taupe,
                      display: "block",
                      marginTop: 4,
                    }}>
                      {ev.desc}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}
      </div>
    </Paper>
  );
};

export default Timeline;
