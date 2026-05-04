"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const sceneRef = useRef(null);
  const lensRef = useRef(null);
  const lensVideoRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) {
      return undefined;
    }

    const scene = sceneRef.current;
    const lens = lensRef.current;
    const lensVideo = lensVideoRef.current;

    if (!scene || !lens || !lensVideo) {
      return undefined;
    }

    const lensSize = 168;
    const lensHalf = lensSize / 2;
    let bounds = scene.getBoundingClientRect();
    let frame = 0;
    let inside = false;
    let targetX = bounds.width / 2;
    let targetY = bounds.height / 2;
    let currentX = targetX;
    let currentY = targetY;
    let lastX = targetX;
    let lastY = targetY;

    const updateBounds = () => {
      bounds = scene.getBoundingClientRect();
      lensVideo.style.width = `${bounds.width}px`;
      lensVideo.style.height = `${bounds.height}px`;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      const velocity = Math.min(
        32,
        Math.hypot(currentX - lastX, currentY - lastY),
      );
      lastX = currentX;
      lastY = currentY;

      lens.style.opacity = inside ? "1" : "0";
      lens.style.transform = `translate3d(${currentX - lensHalf}px, ${currentY - lensHalf}px, 0) scale(${inside ? 1 : 0.92})`;
      lens.style.setProperty("--lens-velocity", velocity.toFixed(2));
      lensVideo.style.transform = `translate3d(${-currentX + lensHalf}px, ${-currentY + lensHalf}px, 0) scale(${1.14 + velocity * 0.002})`;

      if (
        inside ||
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const ensureFrame = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const handleMove = (event) => {
      updateBounds();
      inside = true;
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      ensureFrame();
    };

    const handleLeave = () => {
      inside = false;
      ensureFrame();
    };

    updateBounds();
    scene.addEventListener("pointermove", handleMove);
    scene.addEventListener("pointerenter", handleMove);
    scene.addEventListener("pointerleave", handleLeave);
    window.addEventListener("resize", updateBounds);

    return () => {
      scene.removeEventListener("pointermove", handleMove);
      scene.removeEventListener("pointerenter", handleMove);
      scene.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("resize", updateBounds);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-scene absolute inset-0 overflow-hidden">
      <video
        className="hero-scene__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/cherryeffect.mp4" type="video/mp4" />
      </video>
      <div ref={lensRef} className="hero-distortion-cursor" aria-hidden="true">
        <svg className="hero-distortion-cursor__filter">
          <filter id="hero-distortion-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.03"
              numOctaves="2"
              seed="8"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="7s"
                values="0.012 0.03;0.02 0.05;0.012 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        <div className="hero-distortion-cursor__media">
          <video
            ref={lensVideoRef}
            className="hero-distortion-cursor__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/cherryeffect.mp4" type="video/mp4" />
          </video>
        </div>
        <span className="hero-distortion-cursor__glow" />
      </div>
      <div className="hero-scene__vignette" />
      <div className="hero-scene__dots" />
      <div className="noise-overlay" />
    </div>
  );
}
