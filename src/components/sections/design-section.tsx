"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useVehicleConfig, type CameraPreset } from "@/lib/vehicle-config";

const VehicleViewer = dynamic(() => import("@/components/three/vehicle-viewer"), {
  ssr: false,
  loading: () => <div className="vehicle-canvas vehicle-canvas--loading" aria-hidden="true" />,
});

const details: { index: string; title: string; description: string; camera: CameraPreset }[] = [
  { index: "01", title: "Жарық қолтаңбасы", description: "Жіңішке алдыңғы оптика — технология мен мінездің алғашқы белгісі.", camera: "detail" },
  { index: "02", title: "Ауа ағыны", description: "Төмен капот пен созылыңқы шатыр жел бағытын жұмсақ жалғайды.", camera: "side" },
  { index: "03", title: "Жеңіл қозғалыс", description: "Аэродинамикалық диск дизайны таза профильді толықтырады.", camera: "rear" },
];

export function DesignSection() {
  const [active, setActive] = useState(0);
  const { setCameraPreset } = useVehicleConfig();
  const selected = details[active];

  return (
    <section id="design" className="design-section page-gutter" aria-labelledby="design-title">
      <div className="design-section__intro">
        <div>
          <p className="eyebrow">01 &nbsp; / &nbsp; ПІШІН ЖӘНЕ ҚЫЗМЕТ</p>
          <h2 id="design-title" className="section-title">Әр сызықтың<br /><span>өз себебі бар.</span></h2>
        </div>
        <p className="body-copy">AERON ONE пішіні қозғалыстың өзінен басталады. Артық бөлшек жоқ — әр шешім тұтас силуэтке қызмет етеді.</p>
      </div>

      <motion.div
        className="design-stage"
        initial={{ clipPath: "inset(0 0 18% 0 round 2px)", opacity: 0.7 }}
        whileInView={{ clipPath: "inset(0 0 0% 0 round 2px)", opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="design-stage__light design-stage__light--one" />
        <div className="design-stage__light design-stage__light--two" />
        <VehicleViewer showControls={false} className="vehicle-canvas--design" />
        <div className="design-stage__label"><span>АУА ҚАРСЫЛЫҒЫ</span><strong>0.21*</strong></div>
        <div className="design-stage__caption"><span>ПРОЦЕДУРАЛЫ КОНЦЕПТ-МОДЕЛЬ</span><span>AERON ONE / 01</span></div>
      </motion.div>

      <div className="design-details">
        <div className="design-details__list" role="group" aria-label="Дизайн бөлшектері">
          {details.map((detail, index) => (
            <button
              key={detail.index}
              type="button"
              id={`design-tab-${index}`}
              aria-pressed={active === index}
              aria-controls="design-detail-panel"
              onClick={() => { setActive(index); setCameraPreset(detail.camera); }}
            >
              <span>{detail.index}</span><span>{detail.title}</span>
              {active === index ? <ArrowUpRight size={17} aria-hidden="true" /> : <ArrowDownRight size={17} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div id="design-detail-panel" className="design-details__copy" aria-live="polite" aria-labelledby={`design-tab-${active}`}>
          <p className="eyebrow">{selected.index} &nbsp; / &nbsp; ДИЗАЙН ЕРЕКШЕЛІГІ</p>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
        </div>
      </div>
      <p className="design-footnote">*Көрсеткіш концептуалды демонстрация ретінде берілген, инженерлік растауды білдірмейді.</p>
    </section>
  );
}
