"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useVehicleConfig, type CameraPreset } from "@/lib/vehicle-config";
import { useLocale } from "@/locales/locale-provider";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

const chapterCameras: CameraPreset[] = ["front", "side", "detail", "side", "high", "reveal"];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previousIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setCameraPreset } = useVehicleConfig();
  const { copy } = useLocale();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(chapterCameras.length - 1, Math.floor(progress * chapterCameras.length));
    if (previousIndex.current === index) return;
    previousIndex.current = index;
    setActiveIndex(index);
    setCameraPreset(chapterCameras[index]);
  });

  const chapter = copy.story.chapters[activeIndex];

  return (
    <section ref={sectionRef} className="story" aria-label={copy.story.aria}>
      <div className="story__sticky">
        <div className="story__grid" aria-hidden="true" />
        <div className="story__topline page-gutter">
          <span>01 — 06 &nbsp; / &nbsp; AERON ONE</span>
          <span>{copy.story.top}</span>
        </div>
        <div className="story__model">
          <VehicleViewer showControls={false} className="vehicle-canvas--story" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            className="story__copy page-gutter"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="eyebrow"><span>{String(activeIndex + 1).padStart(2, "0")}</span> &nbsp; {chapter.eyebrow}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.copy}</p>
          </motion.div>
        </AnimatePresence>
        <div className="story__progress page-gutter" aria-label={`${activeIndex + 1} / 6`}>
          <div className="story__progress-line"><motion.span style={{ scaleX: scrollYProgress }} /></div>
          <div className="story__ticks">
            {chapterCameras.map((_, index) => (
              <span key={index} className={index === activeIndex ? "is-active" : ""}>{String(index + 1).padStart(2, "0")}</span>
            ))}
          </div>
        </div>
        <span className="story__hint">{copy.story.hint}</span>
      </div>
    </section>
  );
}
