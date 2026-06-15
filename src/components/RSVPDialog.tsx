import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CardPrice from "./CardPrice";
import { C, OutlineButton, LineInput } from "./shared";

interface GuestInfo {
  name: string;
  price?: number;
  help?: string;
}

const RSVPDialog = () => {
  const [open, setOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPrice, setGuestPrice] = useState<number | undefined>();
  const [guestHelp, setGuestHelp] = useState<string | undefined>();
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    dietary: "",
    songRequest: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("guestInfo");
    if (raw) {
      const guest: GuestInfo = JSON.parse(raw);
      setGuestName(guest.name);
      setGuestPrice(guest.price);
      setGuestHelp(guest.help);
      setFormData(prev => ({ ...prev, name: guest.name }));
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");
    existing.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem("rsvps", JSON.stringify(existing));

    const attendanceText = formData.attendance === "yes"
      ? "Gracias por la invitación, ahí voy a estar"
      : "No voy a poder asistir a su boda";

    let msg = `Hola Santi, soy ${formData.name}.\n\n${attendanceText}`;
    if (formData.dietary) msg += `\n\nTe recuerdo que en la comida no consumo: ${formData.dietary}`;
    if (formData.songRequest) msg += `\n\nMe gustaría que en la boda esté: ${formData.songRequest}`;
    if (guestPrice) msg += `\n\nTambién te adjunto el comprobante de transferencia`;
    msg += `\n\n¡Muchas gracias!`;

    const whatsappUrl = `https://wa.me/542948450880?text=${encodeURIComponent(msg)}`;
    setIsSubmitted(true);
    toast.success("¡Confirmación recibida! Gracias por responder.");
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setTimeout(() => {
        setOpen(false);
        setIsSubmitted(false);
        setFormData({ name: "", attendance: "yes", dietary: "", songRequest: "" });
      }, 100);
    }, 150);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <OutlineButton type="button">Confirmar asistencia</OutlineButton>
      </DialogTrigger>

      <DialogContent
        className="p-0 border-none shadow-none bg-transparent max-w-[430px] w-full"
        style={{ boxShadow: "none", border: "none", borderRadius: 0, padding: 0, background: "transparent", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Modal — hoja parchment con filete grabado */}
        <div style={{
          position: "relative",
          background: C.parchment,
          boxShadow: "0 30px 80px rgba(20,14,10,.45)",
          padding: "48px 46px 44px",
        }}>
          {/* Doble filete (inset reducido para modal) */}
          <div aria-hidden style={{ position: "absolute", inset: 14, border: "1.5px solid rgba(75,53,42,.55)", pointerEvents: "none", zIndex: 5 }} />
          <div aria-hidden style={{ position: "absolute", inset: 20, border: ".75px solid rgba(197,162,83,.65)", pointerEvents: "none", zIndex: 5 }} />

          <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 26,
              color: C.ink,
            }}>
              Confirmación
            </h2>
            <p style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: 13.5,
              color: C.taupe,
              marginTop: 6,
            }}>
              Por favor, confirmá tu asistencia
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 28, display: "flex", flexDirection: "column", gap: 22, textAlign: "left" }}>

                {/* Nombre (readonly) */}
                <div>
                  <p style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: C.glaucous, marginBottom: 6 }}>
                    Nombre
                  </p>
                  <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 16, color: C.ink }}>
                    {guestName || "—"}
                  </p>
                </div>

                {guestPrice && <CardPrice price={guestPrice} currency="USD" />}

                {/* ¿Asistirás? — radios con rombo dorado */}
                <div>
                  <p style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: C.glaucous, marginBottom: 8 }}>
                    ¿Asistirás?
                  </p>
                  {[
                    { value: "yes", label: "Sí, allí estaré" },
                    { value: "no",  label: "No podré asistir" },
                  ].map(opt => (
                    <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 13, cursor: "pointer", padding: "9px 0" }}>
                      <input
                        type="radio"
                        name="attendance"
                        value={opt.value}
                        checked={formData.attendance === opt.value}
                        onChange={() => setFormData({ ...formData, attendance: opt.value })}
                        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                      />
                      {/* Mark: círculo hairline, con rombo dorado cuando seleccionado */}
                      <span style={{
                        width: 16, height: 16,
                        border: `1px solid ${formData.attendance === opt.value ? C.gold : "rgba(75,53,42,.5)"}`,
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        transition: "border-color .2s",
                      }}>
                        {formData.attendance === opt.value && (
                          <span style={{ width: 7, height: 7, background: C.gold, transform: "rotate(45deg)", display: "block" }} />
                        )}
                      </span>
                      <span style={{
                        fontFamily: "Playfair Display, serif",
                        fontStyle: "italic",
                        fontSize: 15,
                        color: C.ink,
                      }}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Restricción alimentaria */}
                <LineInput
                  label="Restricción alimentaria"
                  placeholder="Ej: Sin TACC, sin lácteos..."
                  value={formData.dietary}
                  onChange={e => setFormData({ ...formData, dietary: e.target.value })}
                />

                {/* Canción */}
                <div>
                  <p style={{ fontFamily: "Playfair Display, serif", fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: C.glaucous, marginBottom: 4 }}>
                    Canciones (máx. 2)
                  </p>
                  <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 13.5, color: C.ink, lineHeight: 1.4, marginBottom: 6 }}>
                    ¿Qué canciones no pueden faltar?
                  </p>
                  <input
                    placeholder="Ej: Cae el sol — Airbag"
                    value={formData.songRequest}
                    onChange={e => setFormData({ ...formData, songRequest: e.target.value })}
                    onFocus={e => e.currentTarget.style.borderBottomColor = C.glaucous}
                    onBlur={e => e.currentTarget.style.borderBottomColor = "rgba(75,53,42,.35)"}
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      borderBottom: "1px solid rgba(75,53,42,.35)", padding: "9px 2px",
                      fontFamily: "Inter, sans-serif", fontSize: 14, color: C.ink,
                      outline: "none", caretColor: C.glaucous, transition: "border-color .25s",
                    }}
                  />
                </div>

                {/* Nota "venís de lejos" — italic taupe con filete dorado, NO caja amarilla */}
                {guestHelp && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", marginTop: 4 }}>
                    <div style={{ width: 40, height: 1, background: C.gold }} />
                    <p style={{
                      fontFamily: "Playfair Display, serif",
                      fontStyle: "italic",
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: C.taupe,
                      maxWidth: 300,
                    }}>
                      {guestHelp}
                    </p>
                    <div style={{ width: 40, height: 1, background: C.gold }} />
                  </div>
                )}

                {guestPrice && (
                  <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 13, color: C.taupe, textAlign: "center" }}>
                    Por favor adjuntá tu comprobante junto con el mensaje de asistencia.
                  </p>
                )}

                <OutlineButton type="submit" style={{ marginTop: 4 }}>
                  Enviar confirmación
                </OutlineButton>
              </form>
            ) : (
              <div style={{ padding: "32px 0", textAlign: "center" }}>
                {/* Rombo dorado como ícono de éxito */}
                <div style={{
                  width: 40, height: 40,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <div style={{ width: 18, height: 18, background: C.gold, transform: "rotate(45deg)" }} />
                </div>
                <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 17, color: C.ink }}>
                  ¡Confirmación recibida!
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.taupe, marginTop: 8 }}>
                  Gracias por confirmar tu asistencia
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RSVPDialog;
