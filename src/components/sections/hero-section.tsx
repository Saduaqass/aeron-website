"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

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
          role="group"
          aria-label="AERON ONE концепт-спортседаны"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.35, ease: [0.23, 1, 0.32, 1], delay: 0.22 }}
        >
          <div className="hero__vehicle-glow" />
          <VehicleViewer />
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
