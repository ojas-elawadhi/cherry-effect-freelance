export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/cherryeffect.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
