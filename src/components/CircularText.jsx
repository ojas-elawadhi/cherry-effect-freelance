const CircularText = ({ text, spinDuration = 20, className = "" }) => {
  const letters = Array.from(text);

  return (
    <span
      aria-hidden="true"
      className={`circular-text ${className}`}
      style={{
        "--spin-duration": `${spinDuration}s`,
        "--spin-hover-duration": `${spinDuration / 4}s`,
      }}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={{
            transform: `rotate(${(360 / letters.length) * index}deg)`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

export default CircularText;
