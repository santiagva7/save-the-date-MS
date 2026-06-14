import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

// Place an MP3 file at public/ambient.mp3 to enable background music.
const AUDIO_SRC = "/ambient.mp3";
const TARGET_VOLUME = 0.4;
const START_SECOND = 15; // Change to start playback from a specific second

const MusicButton = () => {
  const [playing, setPlaying] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    const step = TARGET_VOLUME / 25;
    const interval = setInterval(() => {
      const next = Math.min(audio.volume + step, TARGET_VOLUME);
      audio.volume = next;
      if (next >= TARGET_VOLUME) clearInterval(interval);
    }, 40);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    const isFirst = firstPlay;
    if (isFirst) {
      audio.currentTime = START_SECOND;
      setFirstPlay(false);
    }

    try {
      await audio.play();
      if (isFirst) fadeIn(audio);
    } catch (err) {
      console.error("No se pudo reproducir el audio:", err);
      return;
    }

    setPlaying(true);
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
