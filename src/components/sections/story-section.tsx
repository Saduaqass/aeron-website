"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useVehicleConfig, type CameraPreset } from "@/lib/vehicle-config";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

const chapters: { eyebrow: string; title: string; copy: string; camera: CameraPreset; number: string }[] = [
  { number: "01", eyebrow: "БАСТАУ", title: "Жаңа қозғалыс тілі.", copy: "AERON ONE — электр дәуіріне арналған таза пропорциялар мен сабырлы күштің үйлесімі.", camera: "front" },
  { number: "02", eyebrow: "АЭРОДИНАМИКА", title: "Ауаға бағынбайды.", copy: "Әр сызық кедергіні азайтып, қозғалысты жеңілдетуге бағытталған.", camera: "side" },
  { number: "03", eyebrow: "ЖАРЫҚ", title: "Түнге арналған қолтаңба.", copy: "Жіңішке жарық сызығы көліктің мінезін бір сәтте танытады.", camera: "detail" },
  { number: "04", eyebrow: "ПІШІН", title: "Тыныш күш.", copy: "Кең иық, ұзын база және төмен профиль бір тұтас мүсінге айналады.", camera: "side" },
  { number: "05", eyebrow: "ТЕХНОЛОГИЯ", title: "Адамға бейімделген.", copy: "Цифрлық жүйелер назарды жолдан бөлмей, жүргізушіні қолдайды.", camera: "high" },
  { number: "06", eyebrow: "AERON ONE", title: "Болашаққа бет бұр.", copy: "Жобалық концепция. Көрсетілген сипаттамалар — демонстрациялық болжам.", camera: "reveal" },
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setCameraPreset } = useVehicleConfig();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
    setActiveIndex((current) => {
      if (current !== index) setCameraPreset(chapters[index].camera);
      return index === current ? current : index;
    });
  });

  const chapter = chapters[activeIndex];

  return (
    <section ref={sectionRef} className="story" aria-label="AERON ONE дизайн тарихы">
      <div className="story__sticky">
        <div className="story__grid" aria-hidden="true" />
        <div className="story__topline page-gutter">
          <span>01 — 06 &nbsp; / &nbsp; AERON ONE</span>
          <span>DESIGN IN MOTION</span>
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
            <p className="eyebrow"><span>{chapter.number}</span> &nbsp; {chapter.eyebrow}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.copy}</p>
          </motion.div>
        </AnimatePresence>
        <div className="story__progress page-gutter" aria-label={`Көрініс ${activeIndex + 1} / 6`}>
          <div className="story__progress-line"><motion.span style={{ scaleX: scrollYProgress }} /></div>
          <div className="story__ticks">
            {chapters.map((item, index) => (
              <span key={item.number} className={index === activeIndex ? "is-active" : ""}>{item.number}</span>
            ))}
          </div>
        </div>
        <span className="story__hint">ЖАЛҒАСТЫРУ ҮШІН АЙНАЛДЫРЫҢЫЗ</span>
      </div>
    </section>
  );
}
