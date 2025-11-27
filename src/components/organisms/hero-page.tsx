"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@components/molecules/hero-highlight";
import PotraitImage from "@assets/potrait-shot.jpg";

const PLACEHOLDER_IMG = "https://placehold.co/800x600";

const HeroCard = ({
  title,
  description,
  badge,
  href,
}: {
  title: string;
  description: string;
  badge: string;
  href: string;
}) => (
  <a
    href={href}
    className="group block rounded-2xl border border-skin-line bg-skin-card/50 p-6 transition-colors hover:bg-skin-card"
  >
    <span className="mb-4 inline-block rounded-full bg-skin-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-skin-inverted">
      {badge}
    </span>
    <h3 className="mb-2 text-xl font-bold text-skin-base">{title}</h3>
    <p className="text-sm text-skin-base opacity-80">{description}</p>
  </a>
);

export function HeroHighlightDemo() {
  return (
    <HeroHighlight
      containerClassName="h-auto min-h-[40rem] py-12 sm:py-20 sm:h-auto"
      className="flex w-full flex-col justify-between gap-12"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-start gap-8 sm:flex-row">
          {/* Image Section */}
          <div className="xl:w-8/12 relative w-full sm:w-7/12">
            <h1 className="md:text-8xl absolute -top-10 z-20 font-cash-paper uppercase leading-none text-skin-accent sm:-top-10 sm:text-5xl">
              Rioba Ian
            </h1>
            <div className="lg:aspect-auto lg:h-[500px] relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src={PotraitImage.src || PLACEHOLDER_IMG}
                alt="Rioba Ian"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Title Section */}
            <div className="mt-8">
              <div className="md:text-4xl mt-2 text-2xl font-bold sm:text-3xl">
                <Highlight className="text-skin-inverted">
                  Software Engineer
                </Highlight>
              </div>
              <ul className="mt-4 max-w-2xl font-cash-paper text-lg text-skin-base opacity-90">
                <li className="">Solving real-world problems.</li>
                <li>Constant learner</li>
                <li>& adventure junkie.</li>
              </ul>
            </div>
          </div>

          {/* Cards Section */}
          <div className="xl:w-4/12 flex w-full flex-col gap-4 sm:w-5/12">
            <HeroCard
              badge="Speaking 🎤"
              title="Invite me to speak"
              description="I love sharing my journey as a software engineer. Let's inspire your team or audience together!"
              href="/contact"
            />
            <HeroCard
              badge="Mentoring Call 🗓️"
              title="Book a mentoring call"
              description="Whether you're breaking into tech or aiming for promotion, I offer 1:1 sessions to help you level up."
              href="/schedule-call"
            />
            <HeroCard
              badge="Newsletter 💌"
              title="Subscribe to my newsletter"
              description="I share personal career lessons, growth frameworks, and opportunities for folks in tech."
              href="/newsletter"
            />
          </div>
        </div>
      </div>

      {/* Scrolling Text Background */}
      <div className="relative w-full overflow-hidden bg-skin-card py-4">
        <motion.div
          className="whitespace-nowrap text-4xl font-black leading-none text-skin-base opacity-30 sm:text-6xl"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          Consultant • Software Engineer • Speaker • Consultant • Software
          Engineer • Speaker • Consultant • Software Engineer • Speaker •
          Consultant • Software Engineer • Speaker •
        </motion.div>
      </div>
    </HeroHighlight>
  );
}
