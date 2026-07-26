"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/cherryeffect.mp4";
const POSTER_SRC = "/cherryeffect-poster.webp";

export default function HeroBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const connection = navigator.connection;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const constrainedConnection =
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType);

    if (prefersReducedMotion || constrainedConnection) {
      return undefined;
    }

    let idleId = null;
    let timeoutId = null;

    const loadVideo = () => {
      const video = videoRef.current;

      if (!video || video.dataset.loaded === "true") {
        return;
      }

      video.dataset.loaded = "true";
      video.src = VIDEO_SRC;
      video.load();
      video.play().catch(() => {
        // The poster remains visible if autoplay is unavailable.
      });
    };

    const scheduleVideo = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadVideo, { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(loadVideo, 800);
      }
    };

    if (document.readyState === "complete") {
      scheduleVideo();
    } else {
      window.addEventListener("load", scheduleVideo, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleVideo);

      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="hero-background absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={POSTER_SRC}
      />
    </div>
  );
}
