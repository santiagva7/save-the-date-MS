import { Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FooterSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer ref={ref} className="w-full py-12 px-4 text-center bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <Heart className={`w-8 h-8 mx-auto mb-4 text-wedding-gold ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} />
        <p className={`text-sm text-muted-foreground ${isVisible ? 'animate-slide-up-delay-200' : 'opacity-0'}`}>
          Nos encantaría compartir este día especial contigo
        </p>
        <p className={`text-xs text-muted-foreground mt-4 ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}>
          © 2027 Melina & Santiago
        </p>
      </div>
    </footer>
  );
}
