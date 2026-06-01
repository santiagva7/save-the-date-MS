import backTruck from "@/assets/back-truck.jpg";
import RSVPDialog from "./RSVPDialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function RSVPSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="w-full py-12 px-4 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        {/* Mobile layout - Image on top */}
        <div className="md:hidden flex flex-col gap-0">
          <img 
            src={backTruck} 
            alt="Couple photo" 
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <div className={`flex flex-col justify-center p-8 text-center ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className={`font-playfair text-3xl md:text-4xl font-bold mb-4 ${isVisible ? 'animate-slide-up-delay-300' : 'opacity-0'}`}>
              Confirma tu asistencia
            </h2>
            <p className={`text-muted-foreground mb-8 max-w-xl mx-auto ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}>
              Nos encantaría contar con vos en esta celebración. Por favor, hacenos saber si vas a poder asistir.
            </p>
            <RSVPDialog />
          </div>
        </div>

        {/* Desktop layout - Image on right */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-0 md:items-stretch">
          {/* Content - 2/3 */}
          <div className={`w-full md:col-span-2 flex flex-col justify-center p-8 md:p-12 text-center ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className={`font-playfair text-3xl md:text-4xl font-bold mb-4 ${isVisible ? 'animate-slide-up-delay-300' : 'opacity-0'}`}>
              Confirma tu asistencia
            </h2>
            <p className={`text-muted-foreground mb-8 max-w-xl mx-auto ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}>
              Nos encantaría contar con vos en esta celebración. Por favor, hacenos saber si vas a poder asistir.
            </p>
            <RSVPDialog />
          </div>

          {/* Image - 1/3 */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <img 
              src={backTruck} 
              alt="Couple photo" 
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
