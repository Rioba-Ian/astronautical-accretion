"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@components/molecules/hero-highlight";
import { TextGenerateEffect } from "@components/atoms/text-generate-effect";

const words = `I love building things 🚀 that solve real-world problems, a constant learner 🧐 and an adventure junkie 🥾`;

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="lg:text-6xl text-neutral-600 dark:text-white lg:leading-snug mx-auto max-w-4xl px-4 text-center text-3xl font-bold leading-relaxed sm:text-5xl "
      >
        Hi, I'm Rioba Ian |
        <br />
        <Highlight className="text-neutral-700 dark:text-white">
          Software Engineer
        </Highlight>
      </motion.h1>
      <div className="mx-auto max-w-4xl p-4">
        <TextGenerateEffect duration={2} filter={true} words={words} />
      </div>
    </HeroHighlight>
  );
}
