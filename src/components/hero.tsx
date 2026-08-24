import { motion, useReducedMotion, type Variants } from "motion/react";
import portraitAsset from "@/assets/portrait-healthcare-dev.png.asset.json";
import { AnimatedWords, CountUp, Magnetic } from "@/components/motion-text";
import { stats, tools } from "@/data/projects";

const uniqueTools = Array.from(new Set(tools));

// Split the stack into two disjoint lanes so no tag repeats between the marquees.
const laneOne = uniqueTools.filter((_, i) => i % 2 === 0);
const laneTwo = uniqueTools.filter((_, i) => i % 2 === 1).reverse();

/** Shared easing so every hero element settles on the same curve. */
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number, y = 16): Variants => ({
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { delay, duration: 0.75, ease: EASE },
    },
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-10 sm:px-6 lg:pt-14"
    >
      {/* Soft drifting colour blobs behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="drift-blob absolute -top-24 -left-24 size-80 rounded-full bg-brand-sky/30 blur-[80px] sm:size-96" />
        <div className="drift-blob absolute top-1/4 -right-28 size-72 rounded-full bg-brand-teal/25 blur-[70px] sm:size-88" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            {/* Availability pill */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-[var(--shadow-hairline)] edge"
              variants={fadeUp(0.1, 12)}
              initial="hidden"
              animate="show"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
              </span>
              Available for healthcare software projects · Q3 2026
            </motion.div>

            {/* Headline */}
            <motion.div
              className="mt-6"
              variants={fadeUp(0.2, 18)}
              initial="hidden"
              animate="show"
            >
              <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                <AnimatedWords
                  as="span"
                  text="Healthcare software engineered for scale, security, and patient outcomes."
                  delay={280}
                  stagger={42}
                  className="block"
                />
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              variants={fadeUp(0.4, 16)}
              initial="hidden"
              animate="show"
            >
              Building secure, HIPAA-aligned healthcare platforms — EHR systems,
              HL7/FHIR interoperability, telehealth, and remote patient monitoring
              — with .NET 8 microservices and modern frontend frameworks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-7 flex flex-wrap items-center gap-3"
              variants={fadeUp(0.55, 16)}
              initial="hidden"
              animate="show"
            >
              <Magnetic strength={10}>
                <a
                  href="#work"
                  className="press sheen inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  View projects
                </a>
              </Magnetic>
              <Magnetic strength={10}>
                <a
                  href="#contact"
                  className="press edge inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary"
                >
                  Get in touch
                </a>
              </Magnetic>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
              variants={fadeUp(0.7, 18)}
              initial="hidden"
              animate="show"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-card p-4 edge-card"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="font-display text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Portrait column */}
          <motion.div
            className="order-1 lg:order-2"
            variants={fadeUp(0.35, 24)}
            initial="hidden"
            animate="show"
          >
            <div className="hero-rise relative transform-gpu">
              <div className="slide-card relative overflow-hidden rounded-[2rem] p-3 sm:rounded-[2.5rem] sm:p-4">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-brand-sky/40 sm:rounded-[2rem]">
                  <img
                    src={portraitAsset.url}
                    alt="Illustrated portrait of Mostafa Samir, a healthcare full-stack engineer"
                    width={1024}
                    height={1024}
                    decoding="async"
                    fetchPriority="high"
                    className="float-slow hero-media size-full transform-gpu object-cover object-top"
                  />
                </div>

                {/* Floating tagline sticker */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto">
                  <div className="inline-flex items-center gap-2 rounded-full bg-card/95 px-4 py-2 text-xs font-semibold text-foreground shadow-[var(--shadow-lift)] backdrop-blur-sm edge">
                    <span className="size-2 rounded-full bg-brand-teal" />
                    EHR · FHIR · Telehealth · Cloud
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tools marquee */}
        <div className="mt-10 space-y-3">
          <div className="edge-card overflow-hidden rounded-2xl bg-card py-2.5 sm:rounded-full sm:py-3">
            <div className="marquee-track gap-5 px-3 sm:gap-8 sm:px-4">
              {[...laneOne, ...laneOne].map((tool, i) => (
                <span
                  key={`tool-a-${tool}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-[0.68rem] font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-brand-orange sm:gap-3 sm:text-sm"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-orange" />
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="edge-card overflow-hidden rounded-2xl bg-card/70 py-2.5 sm:rounded-full sm:py-3">
            <div className="marquee-back gap-5 px-3 sm:gap-8 sm:px-4">
              {[...laneTwo, ...laneTwo].map((tool, i) => (
                <span
                  key={`tool-b-${tool}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-[0.68rem] font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-brand-teal sm:gap-3 sm:text-sm"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-teal" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
