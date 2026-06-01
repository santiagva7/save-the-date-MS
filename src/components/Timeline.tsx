import { useRef } from "react";
import { Clock, MapPin } from "lucide-react";
import { DesignTheme } from "@/lib/designThemes";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description?: string;
}

interface TimelineProps {
  theme?: DesignTheme;
}

const Timeline = ({ theme }: TimelineProps) => {
  const events: TimelineEvent[] = [
    {
      time: "20:00",
      title: "Recepción",
      location: "Patio del salón",
      description: "Comienza la ceremonia religiosa"
    },
    {
      time: "22:00",
      title: "Cena",
      location: "Comedor",
      description: "Cena servida a la mesa"
    },
    {
      time: "23:30",
      title: "Brindis y juegos",
      location: "Salón Principal",
      description: "Brindis especial y actividades. ¡Barra abierta!"
    }
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={timelineRef} className="w-full py-12 px-4" style={{ backgroundColor: theme?.colors.background }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
          >
            Horario del Evento
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="max-w-xl mx-auto"
            style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
          >
            Conocé la agenda de nuestra celebración
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative pl-10">
          {/* Continuous vertical line — grows on scroll */}
          <motion.div
            className="absolute left-4 top-6 bottom-6 w-0.5 origin-top"
            style={{
              scaleY: lineScaleY,
              backgroundImage: `linear-gradient(to bottom, ${theme?.colors.primary}, ${theme?.colors.primary}88, transparent)`,
            }}
          />

          {/* Events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="relative"
              >
                {/* Dot on the line */}
                <div
                  className="absolute left-[-29px] top-5 w-3 h-3 rounded-full border-2 z-10"
                  style={{
                    backgroundColor: theme?.colors.primary,
                    borderColor: theme?.colors.background || 'white',
                  }}
                />

                {/* Card */}
                <div
                  className="rounded-lg p-5 shadow-sm border hover:shadow-md transition-shadow duration-300"
                  style={{
                    backgroundColor: theme?.colors.light,
                    borderColor: `${theme?.colors.primary}33`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 flex-shrink-0" style={{ color: theme?.colors.primary }} />
                    <span
                      className="text-2xl font-bold"
                      style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.primary }}
                    >
                      {event.time}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
                  >
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2 text-sm" style={{ color: theme?.colors.accent }}>
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.6 }} />
                    <span>{event.location}</span>
                  </div>

                  {event.description && (
                    <p
                      className="text-sm"
                      style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
