import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import handsBack from "@/assets/hands_back.jpg";
import { DesignTheme } from "@/lib/designThemes";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  theme?: DesignTheme;
}

const Countdown = ({ theme }: CountdownProps) => {
  const weddingDate = new Date("2027-01-10T18:00:00");
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = weddingDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="rounded-xl shadow-md p-4 mb-2 min-w-[70px] md:min-w-[90px] overflow-hidden flex justify-center"
        style={{ backgroundColor: theme?.colors.light || '#faf8f3' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-bold text-3xl md:text-4xl block"
            style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.primary || '#bb9457' }}
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="text-xs md:text-sm uppercase tracking-wider"
        style={{ color: theme?.colors.accent || '#99582a', fontFamily: theme?.fonts.body }}
      >
        {label}
      </span>
    </div>
  );

  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="w-full py-12 px-4" style={{ backgroundColor: theme?.colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile layout - Image on top */}
        <div className="md:hidden flex flex-col gap-0">
          <img 
            src={handsBack} 
            alt="Couple photo" 
            className={`w-full h-80 object-cover rounded-t-2xl ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          />
          <div 
            className="flex flex-col justify-center p-8 text-center"
            style={{ backgroundColor: theme?.colors.background }}
          >
            <div className={`inline-flex items-center gap-2 mb-4 justify-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <Calendar className="w-5 h-5" style={{ color: theme?.colors.primary }} />
              <span 
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
              >
                Cuenta regresiva
              </span>
            </div>
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-8 ${isVisible ? 'animate-slide-up-delay-200' : 'opacity-0'}`}
              style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
            >
              Faltan...
            </h2>

            <div className="flex justify-center gap-4 md:gap-6">
              <TimeUnit value={timeLeft.days} label="Días" />
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <TimeUnit value={timeLeft.minutes} label="Minutos" />
              <TimeUnit value={timeLeft.seconds} label="Segundos" />
            </div>
          </div>
        </div>

        {/* Desktop layout - Image on left */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-0 md:items-stretch">
          {/* Image - 1/3 */}
          <div className={isVisible ? 'animate-slide-in-left' : 'opacity-0'}>
            <img 
              src={handsBack} 
              alt="Couple photo" 
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>
          
          {/* Content - 2/3 */}
          <div 
            className="md:col-span-2 flex flex-col justify-center p-8 md:p-12"
            style={{ backgroundColor: theme?.colors.background }}
          >
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 mb-4 justify-center ${isVisible ? 'animate-slide-up-delay-300' : 'opacity-0'}`}>
                <Calendar className="w-5 h-5" style={{ color: theme?.colors.primary }} />
                <span 
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
                >
                  Cuenta regresiva
                </span>
              </div>
              <h2 
                className={`text-3xl md:text-4xl font-bold mb-8 ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}
                style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
              >
                Faltan...
              </h2>

              <div className="flex justify-center gap-4 md:gap-6">
                <TimeUnit value={timeLeft.days} label="Días" />
                <TimeUnit value={timeLeft.hours} label="Horas" />
                <TimeUnit value={timeLeft.minutes} label="Minutos" />
                <TimeUnit value={timeLeft.seconds} label="Segundos" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
