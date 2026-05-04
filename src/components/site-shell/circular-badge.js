import CircularText from "@/components/CircularText";

export default function CircularBadge() {
  return (
    <a
      href="#contact"
      className="circular-badge fixed right-4 top-24 z-40 hidden lg:block"
      aria-label="Jump to contact form"
    >
      <CircularText
        text="THE*CHERRY*EFFECT*"
        spinDuration={20}
        onHover="speedUp"
        className="circular-badge__reactbits"
      />
      <span className="circular-badge__core">TCE</span>
    </a>
  );
}
