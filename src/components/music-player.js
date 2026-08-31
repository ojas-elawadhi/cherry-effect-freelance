"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TRACKS = [
  "/music/tik-tok.mp3",
  "/music/sahiba.mp3",
  "/music/love-nwantiti-remix.mp3",
  "/music/ecos-del-tambor.mp3",
  "/music/youre-u-tho.mp3",
  "/music/baddies.mp3",
  "/music/suv.mp3",
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const startPlayback = useCallback(() => {
    return audioRef.current?.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    startPlayback();

    function unlockAudio() {
      startPlayback();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    }

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [startPlayback]);

  useEffect(() => {
    startPlayback();
  }, [trackIndex, startPlayback]);

  function shuffleTrack() {
    setTrackIndex((current) => {
      const offset = Math.floor(Math.random() * (TRACKS.length - 1)) + 1;
      return (current + offset) % TRACKS.length;
    });
  }

  function toggleMute() {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      startPlayback();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACKS[trackIndex]}
        autoPlay
        preload="auto"
        muted={isMuted}
        onEnded={shuffleTrack}
      />
      <button
        className="music-mute-button"
        type="button"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute music" : "Mute music"}
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
      </button>
    </>
  );
}
