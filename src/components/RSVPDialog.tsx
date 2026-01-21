import { useState, useEffect } from "react";
import { Check, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import CardPrice from "./CardPrice";

interface GuestInfo {
  name: string;
  price?: number;
}

const RSVPDialog = () => {
  const [open, setOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPrice, setGuestPrice] = useState<number | undefined>();
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Obtener nombre del invitado desde localStorage
    const guestInfo = localStorage.getItem("guestInfo");
    if (guestInfo) {
      const guest: GuestInfo = JSON.parse(guestInfo);
      setGuestName(guest.name);
      setGuestPrice(guest.price);
      setFormData(prev => ({ ...prev, name: guest.name }));
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const existingRSVPs = JSON.parse(localStorage.getItem("rsvps") || "[]");
    existingRSVPs.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("rsvps", JSON.stringify(existingRSVPs));
    
    // Generar mensaje para WhatsApp
    const attendanceText = formData.attendance === "yes" ? "Gracias por la invitación, ahí voy a estar" : "No voy a poder asistir a su boda";
    let whatsappMessage = `Hola Santi, soy ${formData.name}.\n\n${attendanceText}${formData.message ? `\n\nTe recuerdo que en la comida no consumo: ${formData.message}` : ""}`;
    
    // Si tiene que pagar tarjeta, agregar el texto del comprobante
    if (guestPrice) {
      whatsappMessage += `\n\nTambién te adjunto el comprobante de transferencia`;
    }
    
    whatsappMessage += `\n\n¡Muchas gracias!`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappPhone = "542948450880"; // Sin caracteres especiales
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
    
    setIsSubmitted(true);
    toast.success("¡Confirmación recibida! Gracias por responder.");
    
    // Abrir WhatsApp después de un pequeño delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      
      setTimeout(() => {
        setOpen(false);
        setIsSubmitted(false);
        setFormData({
          name: "",
          attendance: "yes",
          message: "",
        });
      }, 100);
    }, 150);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-wedding-gold hover:bg-wedding-gold/90 text-foreground font-medium text-lg px-8 py-6 shadow-[var(--shadow-elegant)]"
        >
          <Mail className="mr-2 h-5 w-5" />
          Confirmar asistencia
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">
            CONFIRMACIÓN
          </DialogTitle>
          <DialogDescription>
            Por favor, confirma tu asistencia a nuestra boda
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <div className="p-3 bg-muted rounded-md text-foreground font-medium">
                {guestName || "Cargando..."}
              </div>
            </div>

            {guestPrice && <CardPrice price={guestPrice} currency="USD" />}

            <div className="space-y-2">
              <Label>¿Asistirás?</Label>
              <RadioGroup
                value={formData.attendance}
                onValueChange={(value) => setFormData({ ...formData, attendance: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal cursor-pointer">
                    Sí, allí estaré
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="font-normal cursor-pointer">
                    No podré asistir
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">¿Tenés alguna restricción alimentaria? Contanos qué no podes comer</Label>
              <Input
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ejemplo: Carne, TACC, lácteos..."
              />
            </div>
            <div>
                <p className="font-medium text-foreground mb-1">Por favor adjunta tu comprobante junto con el mensaje de asistencia </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-foreground font-medium"
            >
              Enviar confirmación
            </Button>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
              <Check className="w-8 h-8 text-wedding-gold" />
            </div>
            <p className="text-lg font-medium">¡Confirmación recibida!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Gracias por confirmar tu asistencia
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RSVPDialog;
