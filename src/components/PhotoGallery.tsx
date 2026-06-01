import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import backTruck from "@/assets/back-truck.jpg";
import couplePhoto4 from "@/assets/couple-photo-4.jpg";
import extendedKiss from "@/assets/extended-hand-kiss.jpg";
import handsBack from "@/assets/hands_back.jpg";
import upUp from "@/assets/upup.jpg";

const images = [backTruck, couplePhoto4, extendedKiss, handsBack, upUp];

const PhotoGallery = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={current}
          src={images[current]}
          alt="Melina y Santiago"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Gradient edges to blend with surrounding sections */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default PhotoGallery;
