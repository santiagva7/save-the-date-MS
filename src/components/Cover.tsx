import { motion, useReducedMotion } from "framer-motion";
import arco from "@/assets/meli-santi-arco.jpg";
import { C, Paper, EngravedFrame, Flourish } from "./shared";

/**
 * Portada — primera pantalla de la tarjeta.
 * Anillos, nombres en script, "Nos Casamos", divisor y la foto en ventana rectangular.
 * Usa el sistema visual de la tarjeta (tokens C, Slight, Playfair, marco grabado).
 */
const Cover = () => {
  const shouldReduce = useReducedMotion();

  return (
    <Paper>
      <EngravedFrame />

      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "58px 42px 48px",
        }}
      >
        {/* Anillos */}
        

        {/* Nombres */}
        <div
          style={{
            fontFamily: "'Slight', 'Pinyon Script', cursive",
            fontSize: 58,
            lineHeight: 0.95,
            color: C.ink,
          }}
        >
          Melina
          <br />
          <span style={{ fontSize: 38, color: C.gold, display: "inline-block", margin: "4px 0" }}>&amp;</span>
          <br />
          Santiago
        </div>

        {/* Texto */}
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: ".42em",
            textTransform: "uppercase",
            color: C.taupe,
            marginTop: 24,
            paddingLeft: ".42em",
          }}
        >
          Nos Casamos
        </p>

        {/* Divisor con diamante */}
        <Flourish style={{ marginTop: 20 }} />

        {/* Ventana — foto rectangular */}
        <div style={{ marginTop: 28, width: "100%", flex: 1, minHeight: 0, padding: 8 }}>
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <img
              src={arco}
              alt="Melina y Santiago"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 58%", transform: "scale(1.35)", transformOrigin: "center 60%", display: "block" }}
            />
          </div>
        </div>

        {/* Fecha */}
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: C.ink,
            marginTop: 24,
            paddingLeft: ".3em",
            whiteSpace: "nowrap",
          }}
        >
          10 · 01 · 2027
        </p>
      </motion.div>
    </Paper>
  );
};

export default Cover;
