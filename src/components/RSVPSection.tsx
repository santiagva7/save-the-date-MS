import backTruck from "@/assets/back-truck.jpg";
import RSVPDialog from "./RSVPDialog";
import { C, Paper, EngravedFrame, Overline, Flourish, TamedPhoto, InViewFade } from "./shared";

export default function RSVPSection() {
  return (
    <Paper>
      <EngravedFrame />

      <TamedPhoto src={backTruck} alt="Melina y Santiago" height={260} />

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
          <Overline style={{ marginTop: 4, color: C.glaucous }}>Confirmación</Overline>
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
            Confirmá tu asistencia
          </h2>
        </InViewFade>
        <InViewFade delay={0.15}>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: 15,
            color: C.taupe,
            lineHeight: 1.6,
            marginTop: 12,
            maxWidth: 300,
          }}>
            Nos encantaría contar con vos en esta celebración.
          </p>
        </InViewFade>
        <InViewFade delay={0.2}>
          <Flourish style={{ margin: "24px 0" }} />
        </InViewFade>

        {/* Fecha límite — placa destacada, se lee antes del CTA */}
        <InViewFade delay={0.22} style={{ width: "100%", marginBottom: 26 }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
            padding: "20px 18px 18px",
            background: C.parchment2,
            border: `1px solid ${C.gold}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}>
            <div aria-hidden style={{
              position: "absolute",
              inset: 4,
              border: ".75px solid rgba(75,53,42,.28)",
              pointerEvents: "none",
            }} />
            <p style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 11,
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: C.glaucous,
              paddingLeft: ".32em",
            }}>
              Fecha límite
            </p>
            <p style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 30,
              lineHeight: 1,
              color: C.ink,
              letterSpacing: ".04em",
            }}>
              10 · 12 · 2026
            </p>
            <p style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: 13,
              lineHeight: 1.5,
              color: C.taupe,
              maxWidth: 240,
            }}>
              Necesitamos tu respuesta antes de esa fecha
            </p>
          </div>
        </InViewFade>
        <InViewFade delay={0.25} style={{ width: "100%" }}>
          <RSVPDialog />
        </InViewFade>

        {/* Firma y pie */}
        <InViewFade delay={0.35} style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Slight', 'Pinyon Script', cursive",
            fontSize: 32,
            color: C.ink,
            lineHeight: 1.1,
          }}>
            Melina &amp; Santiago
          </span>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: C.taupe,
          }}>
            © 2027 · Con amor
          </p>
        </InViewFade>
      </div>
    </Paper>
  );
}
