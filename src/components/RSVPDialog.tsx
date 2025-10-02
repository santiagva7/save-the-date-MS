import { useState } from "react";
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

const RSVPDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const existingRSVPs = JSON.parse(localStorage.getItem("rsvps") || "[]");
    existingRSVPs.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("rsvps", JSON.stringify(existingRSVPs));
    
    setIsSubmitted(true);
    toast.success("¡Confirmación recibida! Gracias por responder.");
    
    setTimeout(() => {
      setOpen(false);
      setIsSubmitted(false);
      setFormData({
        name: "",
        attendance: "yes",
        guests: "1",
        message: "",
      });
    }, 2000);
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">
            RSVP
          </DialogTitle>
          <DialogDescription>
            Por favor, confirma tu asistencia a nuestra boda
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre"
                required
              />
            </div>

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

            {formData.attendance === "yes" && (
              <div className="space-y-2">
                <Label htmlFor="guests">Número de invitados</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje (opcional)</Label>
              <Input
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Deja un mensaje para los novios"
              />
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
