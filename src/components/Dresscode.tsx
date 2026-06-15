import extendedKiss from "@/assets/extended-hand-kiss.jpg";
import { C, Paper, EngravedFrame, Overline, Flourish, TamedPhoto, OutlineLink, InViewFade } from "./shared";

const PINTEREST_URL = "https://www.pinterest.com/search/pins/?q=formal%20wedding%20attire";

interface DressOption {
  title: string;
  ellas: string;
  ellos: string;
}

const OPTIONS: DressOption[] = [
  {
    title: "Formal Elegante",
    ellas: "Vestidos largos o de cóctel elegantes",
    ellos: "Traje completo con corbata",
  },
  {
    title: "Formal Sport",
    ellas: "Vestidos cortos o conjuntos elegantes",
    ellos: "Camisa con pantalón de vestir (sin corbata)",
  },
];

const GenderLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: "Playfair Display, serif",
    fontSize: 11,
    letterSpacing: ".22em",
    textTransform: "uppercase",
    color: C.ink,
  }}>
    {children}
  </span>
);

const Dresscode = () => {
  return (
    <Paper>
      <EngravedFrame />

      <TamedPhoto src={extendedKiss} alt="Melina y Santiago" height={260} />

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
          <Overline style={{ marginTop: 4, color: C.glaucous }}>Etiqueta</Overline>
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
            Código de vestimenta
          </h2>
        </InViewFade>
        <InViewFade delay={0.2}>
          <Flourish style={{ margin: "20px 0 28px" }} />
        </InViewFade>

        {/* Opciones — bloques tipográficos, sin cards */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
          {OPTIONS.map((opt, i) => (
            <div key={i}>
              <InViewFade delay={0.1 + i * 0.1} style={{ textAlign: "left", width: "100%" }}>
                <p style={{
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: C.glaucous,
                  marginBottom: 12,
                }}>
                  {opt.title}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ display: "flex", gap: 10, fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 14, color: C.ink, lineHeight: 1.4 }}>
                    <GenderLabel>Ellas</GenderLabel>
                    <span style={{ color: C.taupe }}>{opt.ellas}</span>
                  </p>
                  <p style={{ display: "flex", gap: 10, fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 14, color: C.ink, lineHeight: 1.4 }}>
                    <GenderLabel>Ellos</GenderLabel>
                    <span style={{ color: C.taupe }}>{opt.ellos}</span>
                  </p>
                </div>
              </InViewFade>

              {/* Divider entre opciones */}
              {i < OPTIONS.length - 1 && (
                <InViewFade delay={0.25} style={{ display: "flex", justifyContent: "center" }}>
                  <Flourish ruleWidth={36} style={{ margin: "24px 0" }} />
                </InViewFade>
              )}
            </div>
          ))}
        </div>

        <InViewFade delay={0.35} style={{ width: "100%", marginTop: 32 }}>
          <OutlineLink href={PINTEREST_URL} target="_blank" rel="noopener noreferrer">
            Ver ideas para vestir
          </OutlineLink>
        </InViewFade>
      </div>
    </Paper>
  );
};

export default Dresscode;
