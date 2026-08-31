"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

const TRACKS = [
  { title: "TiK ToK", artist: "Kesha", src: "/music/tik-tok.mp3" },
  { title: "Sahiba", artist: "Aditya Rikhari", src: "/music/sahiba.mp3" },
  { title: "Love Nwantiti (Remix)", artist: "CKay", src: "/music/love-nwantiti-remix.mp3" },
  { title: "Ecos del Tambor", artist: "", src: "/music/ecos-del-tambor.mp3" },
  { title: "You're U Tho", artist: "Karan Aujla", src: "/music/youre-u-tho.mp3" },
  { title: "Baddies", artist: "Aitch & Luciano", src: "/music/baddies.mp3" },
  { title: "SUV", artist: "Luciano", src: "/music/suv.mp3" },
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const track = TRACKS[trackIndex];

  useEffect(() => {
    if (!hasStarted || !isPlaying) return;

    audioRef.current?.play().catch(() => setIsPlaying(false));
  }, [trackIndex, hasStarted, isPlaying]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function shuffleTrack() {
    setTrackIndex((current) => {
      const offset = Math.floor(Math.random() * (TRACKS.length - 1)) + 1;
      return (current + offset) % TRACKS.length;
    });
  }

  function playNextTrack() {
    shuffleTrack();
    setIsPlaying(true);
  }

  function toggleMute() {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) audioRef.current.muted = nextMuted;
  }

  return (
    <aside className={`music-player${isOpen ? " music-player--open" : ""}`} aria-label="Background music player">
      <audio
        ref={audioRef}
        src={hasStarted ? track.src : undefined}
        preload="none"
        onEnded={playNextTrack}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <button
        className="music-player__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Collapse music player" : "Open music player"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <ChevronDown size={17} /> : <Music2 size={18} />}
      </button>

      <div className="music-player__content">
        <div className="music-player__now-playing" aria-live="polite">
          <span className="music-player__eyebrow">Now playing</span>
          <span className="music-player__title">{track.title}</span>
          {track.artist ? <span className="music-player__artist">{track.artist}</span> : null}
        </div>

        <div className="music-player__controls">
          <button type="button" aria-label="Shuffle to another track" onClick={shuffleTrack}>
            <SkipBack size={17} fill="currentColor" />
          </button>
          <button className="music-player__play" type="button" aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlayback}>
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
          <button type="button" aria-label="Shuffle to another track" onClick={shuffleTrack}>
            <SkipForward size={17} fill="currentColor" />
          </button>
          <button type="button" aria-label={isMuted ? "Unmute" : "Mute"} onClick={toggleMute}>
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
