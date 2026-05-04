"use client";

import { motion } from "motion/react";

export default function SplitHeadline({
  text,
  className = "",
  wordStagger = 0.069,
  viewportAmount = 0.35,
  viewportMargin = "0px 0px 0px 0px",
}) {
  const words = text.split(" ");

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: viewportAmount, margin: viewportMargin }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: wordStagger,
          },
        },
      }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 22,
              scale: 0.96,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                bounce: 0.69,
                duration: 1.2,
              },
            },
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
