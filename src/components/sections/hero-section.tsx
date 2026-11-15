"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const entrance = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true" />
      <div className="hero__grid page-gutter">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], delay: 0.12 }}
          variants={entrance}
        >
          <p className="eyebrow hero__eyebrow"><span /> Электр қуаты. Жаңа дәуір.</p>
          <h1 id="hero-title">Beyond<br /><span>Electric.</span></h1>
          <p className="hero__model">AERON <span>ONE</span></p>
          <div className="hero__actions">
            <Link className="button-primary" href="#design">AERON-ды зерттеу <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <a className="hero__text-link" href="#configurator">Конфигуратор</a>
          </div>
        </motion.div>

        <motion.div
          className="hero__vehicle"
          role="img"
          aria-label="AERON ONE концепт-спортседанының авторлық көрінісі"
          initial={reduceMotion ? false : { opacity: 0, y: 44, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.35, ease: [0.23, 1, 0.32, 1], delay: 0.22 }}
        >
          <div className="hero__vehicle-glow" />
          <svg className="car-silhouette" viewBox="0 0 1120 480" aria-hidden="true">
            <defs>
              <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#737c87" />
                <stop offset="0.18" stopColor="#d8dee3" />
                <stop offset="0.32" stopColor="#4c535c" />
                <stop offset="0.55" stopColor="#171b20" />
                <stop offset="0.76" stopColor="#89919b" />
                <stop offset="1" stopColor="#30363d" />
              </linearGradient>
              <linearGradient id="glass" x1="0" x2="1" y1="1" y2="0">
                <stop stopColor="#10151b" />
                <stop offset="0.48" stopColor="#52606c" />
                <stop offset="1" stopColor="#151a20" />
              </linearGradient>
              <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#87909a" stopOpacity=".4" />
                <stop offset="1" stopColor="#87909a" stopOpacity="0" />
              </linearGradient>
              <filter id="soft"><feGaussianBlur stdDeviation="16" /></filter>
            </defs>
            <ellipse cx="574" cy="386" rx="438" ry="30" fill="url(#floor)" filter="url(#soft)" />
            <path d="M101 315 131 276q28-28 111-39l105-16 125-106q34-28 87-28h169q44 0 81 35l112 104 95 25q42 11 52 43l18 55q4 12-8 19-21 12-66 13h-52q-9-88-93-88t-96 88H391q-8-88-94-88t-98 88h-49q-30-2-48-16l-15-17q-5-13 14-33Z" fill="url(#body)" stroke="#d3dbe2" strokeOpacity=".56" strokeWidth="2" />
            <path d="m361 216 117-98q21-17 53-17h48v115H361Zm235-115h132q29 0 53 23l95 92H596V101Z" fill="url(#glass)" stroke="#e5ebf0" strokeOpacity=".52" strokeWidth="2" />
            <path d="M594 105v110m-239 8h539" stroke="#dce3e9" strokeOpacity=".36" strokeWidth="2" />
            <path d="m147 281 74-21-32 33-56 10m791-33 130 34q17 4 25 18l-153-7Z" fill="#eef5fb" fillOpacity=".82" />
            <path d="m151 291 57-4m745 19 148 11" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
            <path d="M259 328h567" stroke="#d7e1eb" strokeOpacity=".34" strokeWidth="2" />
            <g fill="#090b0e" stroke="#adb5be" strokeWidth="5">
              <circle cx="297" cy="352" r="65" /><circle cx="892" cy="352" r="65" />
              <circle cx="297" cy="352" r="39" fill="#1a1f25" /><circle cx="892" cy="352" r="39" fill="#1a1f25" />
            </g>
            <g fill="none" stroke="#8f9aa5" strokeWidth="3">
              <circle cx="297" cy="352" r="22" /><circle cx="892" cy="352" r="22" />
              <path d="M297 313v78m-39-39h78m556-39v78m-39-39h78" />
            </g>
            <path d="m193 314 25 3m626-99 80 6" stroke="#fff" strokeOpacity=".46" strokeWidth="3" />
          </svg>
          <span className="hero__vehicle-note">AERON ONE <i>·</i> CONCEPT</span>
        </motion.div>

        <motion.div
          className="hero__bottom"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: 0.68 }}
          variants={entrance}
        >
          <span className="hero__index">01 <i>/</i> 06</span>
          <a href="#design" className="hero__scroll"><ArrowDown size={15} aria-hidden="true" /> <span>Төмен айналдырыңыз</span></a>
          <span className="hero__coordinates">43°14&apos;N &nbsp; 76°57&apos;E</span>
        </motion.div>
      </div>
    </section>
  );
}
