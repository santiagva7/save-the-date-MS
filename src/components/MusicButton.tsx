import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

// Place an MP3 file at public/ambient.mp3 to enable background music.
const AUDIO_SRC = "/ambient.mp3";
const TARGET_VOLUME = 0.4;

const MusicButton = () => {
  const [playing, setPlaying] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    const step = TARGET_VOLUME / 25;
    const interval = setInterval(() => {
      if (!audioRef.current) { clearInterval(interval); return; }
      const next = Math.min(audioRef.current.volume + step, TARGET_VOLUME);
      audioRef.current.volume = next;
      if (next >= TARGET_VOLUME) clearInterval(interval);
    }, 40);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
      if (firstPlay) {
        fadeIn();
        setFirstPlay(false);
      } else {
        audio.volume = TARGET_VOLUME;
      }
    }
    setPlaying(prev => !prev);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white border-2 border-wedding-gold shadow-lg flex items-center justify-center hover:bg-wedding-gold/10 transition-colors"
      aria-label={playing ? "Pausar música" : "Reproducir música"}
    >
      {playing
        ? <VolumeX className="w-5 h-5 text-wedding-gold" />
        : <Music2 className="w-5 h-5 text-wedding-gold" />
      }
    </button>
  );
};

export default MusicButton;
